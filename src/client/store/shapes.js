import { PropTypes } from 'react';

export const filterShape = PropTypes.shape({
	limit: PropTypes.number,
	query: PropTypes.string,
});

export const pageMessageShape = PropTypes.shape({
	type: PropTypes.string,
	message: PropTypes.string,
});

export const modalShape = PropTypes.shape({
	modal: PropTypes.string.isRequired,
	payload: PropTypes.any,
});
