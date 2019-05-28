/** @format */

import PropTypes from 'prop-types';

const children = PropTypes.oneOfType(PropTypes.node, PropTypes.func);

const story = PropTypes.shape({
  id: PropTypes.number,
  by: PropTypes.string,
  descendants: PropTypes.number,
  kids: PropTypes.arrayOf(PropTypes.number),
  score: PropTypes.number,
  time: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
});

const stories = PropTypes.arrayOf(story);

const comment = PropTypes.shape({
  id: PropTypes.number,
  by: PropTypes.string,
  descendants: PropTypes.number,
  kids: PropTypes.arrayOf(PropTypes.number),
  parent: PropTypes.number,
  time: PropTypes.number,
  text: PropTypes.string,
  type: PropTypes.string,
});

const comments = PropTypes.arrayOf(comment);

export default {
  children,
  story,
  stories,
  comment,
  comments,
};
