import _ from 'lodash';

export function typesFromResults(docs) {
	                    const types = {};
	                    docs.forEach((doc) => {
		                    _.each(doc, (v, k) => {
			                    if (!types[k] || types[k] == 'null') {
				                    types[k] = getType(v);
			}
		});
	});
	                    return types;
}

const dateStringTest = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,3}Z$/;

export function getType(prop) {
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
	                    if (_.isArray(prop)) {
		                    return 'array';
	}
	                    if (_.isObject(prop)) {
		                    return 'object';
	}
	// it'll never be a date here because json not bson
	                    if (_.isDate(prop)) {
		                    return 'date';
	}
	// keep this above the isString check
	                    if (dateStringTest.test(prop)) {
		                    return 'date';
	}
	                    if (_.isString(prop)) {
		                    return 'string';
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
