import { PropTypes } from 'react';

/**
 * @return {null}
 */
function Confirm(props) {
  const { message, fn, dispatch } = props;
  // eslint-disable-next-line no-alert
  if (confirm(message)) {
    dispatch(fn());
  }

  return null;
}

Confirm.propTypes = {
  message: PropTypes.string.isRequired,
  fn: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Confirm;
