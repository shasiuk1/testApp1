/** @format */

import { camelizeKeys } from 'humps';
import { fetch } from 'whatwg-fetch';
import { merge } from 'lodash';
import config from 'SRC/config';

export const API_CALL = 'API_CALL_KEY';
const defaultRequestOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

function parseJSON(response) {
  return response.json();
}

function parseResponse(response) {
  const contentType =
    (response.headers && response.headers.get('content-type')) || '';
  if (contentType.indexOf('application/json') !== -1) {
    return parseJSON(response);
  }

  return Promise.resolve(response);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return parseResponse(response).then((body) => {
    if (typeof body === 'string') {
      throw new Error(
        JSON.stringify({
          title: 'Error',
          message: body,
          status: response.status,
        }),
      );
    } else {
      throw new Error(JSON.stringify(body));
    }
  });
}

function getFullUrl(url = '') {
  return config.apiUrl + url;
}

function doFetch(endpoint, options = {}) {
  const fullUrl = getFullUrl(endpoint);

  return fetch(fullUrl, options)
    .then(checkStatus)
    .then(parseResponse)
    .then((json) => {
      if (json) {
        const response = {
          entities: {},
        };

        const data = Object.assign(
          {},
          camelizeKeys(
            json,
            // ignore keys that are all uppercase
            (key, convert) => (/^[A-Z0-9_]+$/.test(key) ? key : convert(key)),
          ),
        );
        response.entities.data = data;
        response.entities.raw = json;

        return Promise.resolve(response);
      }

      return Promise.reject(json);
    })
    .catch((error) => {
      throw error;
    });
}

const apiCall = () => (next) => (action) => {
  const callApiAction = { ...action[API_CALL] };
  if (!callApiAction || !callApiAction.endpoint) {
    return next(action);
  }

  const { endpoint, types } = callApiAction;
  const options = merge({}, defaultRequestOptions, callApiAction.options || {});

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[API_CALL];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return doFetch(endpoint, options)
    .then((response) =>
      next(
        actionWith({
          type: successType,
          payload: response.entities,
        }),
      ),
    )
    .catch((error) => {
      let err;
      try {
        err = JSON.parse(error.message);
        return next(
          actionWith({
            type: failureType,
            error: true,
            payload: err,
            status: error.status || null,
          }),
        );
      } catch (e) {
        throw error;
      }
    });
};

export default apiCall;
