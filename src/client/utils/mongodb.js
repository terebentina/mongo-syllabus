import _ from 'lodash';

export function typesFromResults(docs) {
	const types = {};
	docs.forEach((doc) => {
		_.each(doc, (v, k) => {
			if (!types[k] || types[k] == 'null') {
				types[k] = getPropertyType(v);
			}
		});
	});
	return types;
}

export function getPropertyType(prop) {
	if (prop === null || prop === undefined) {
		return 'null';
	}
	if (_.isBoolean(prop)) {
		return 'boolean';
	}
	if (_.isNumber(prop)) {
		return 'number';
	}
	// keep this above the isString check
	if (isObjectId(prop)) {
		return 'objectId';
	}
	if (_.isString(prop)) {
		return 'string';
	}
	if (_.isArray(prop)) {
		return 'array';
	}
	// it'll never be a date here
	if (_.isDate(prop)) {
		return 'date';
	}
	if (_.isObject(prop)) {
		return 'object';
	}
}

// borrowed from the bson package, APACHE 2.0 license
const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
function isObjectId(id) {
	if (id == null) {
		return false;
	}

	if (typeof id == 'number') {
		return true;
	}
	if (typeof id == 'string') {
		return id.length == 12 || (id.length == 24 && checkForHexRegExp.test(id));
	}

	return false;
}
