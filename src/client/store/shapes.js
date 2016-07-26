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

export const collectionCreatePayloadShape = PropTypes.shape({
	db: PropTypes.string,
});

export const collectionRenamePayloadShape = PropTypes.shape({
	db: PropTypes.string,
	collection: PropTypes.string,
});

export const documentUpdatePayloadShape = PropTypes.shape({
	db: PropTypes.string,
	collection: PropTypes.string,
	doc: PropTypes.object,
});
