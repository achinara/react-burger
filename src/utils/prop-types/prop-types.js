import PropTypes from 'prop-types';

const ingredientsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired
).isRequired;

export { ingredientsPropTypes };
