import axios from 'axios';
import _ from 'lodash';

export default {
	get(url, params) {
		return axios.get(url, { params }).then((response) => response.data);
	},

	put(url, params) {
		return axios.put(url, params).then((response) => response.data);
	},

	post(url, params) {
		return axios.post(url, params).then((response) => response.data);
	},

	delete(url, params) {
		const finalUrl = buildUrl(url, params);
		return axios.delete(finalUrl).then((response) => response.data);
	},

	jsonp(url, params = {}) {
		return new Promise((resolve, reject) => {
			jsonp(url, { params }, (err, data) => {
				if (err) {
					return reject(err);
				}
				resolve(data);
			});
		});
	},
};

let count = 0;

function noop() {}

function jsonp(url, opts, fn) {
	const params = opts.params;

	const id = opts.fnName || ('__jp' + (count++));
	const callback = opts.callback || 'callback';

	params[callback] = id;

	const target = document.getElementsByTagName('script')[0] || document.head;
	let script;
	const timer = setTimeout(() => {
		cleanup();
		fn(new Error('Timeout'));
	}, 60000);

	function cleanup() {
		if (script.parentNode) {
			script.parentNode.removeChild(script);
		}
		window[id] = noop;
		if (timer) {
			clearTimeout(timer);
		}
	}

	function cancel() {
		if (window[id]) {
			cleanup();
		}
	}

	window[id] = (data) => {
		cleanup();
		fn(null, data);
	};

	// create script
	script = document.createElement('script');
	script.src = buildUrl(url, params);
	target.parentNode.insertBefore(script, target);

	return cancel;
}

function encode(val) {
	return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

function qs(key, val) {
	let params = [];
	if (Array.isArray(val)) {
		val.forEach((subVal) => {
			params = params.concat(qs(`${key}[]`, subVal));
		});
	} else {
		params.push(`${encode(key)}=${encode(val)}`);
	}
	return params;
}

function buildUrl(url, params) {
	if (!params || !Object.keys(params).length) {
		return url;
	}
	let linkedParams = [];
	_.each(params, (val, key) => {
		linkedParams = linkedParams.concat(qs(key, val));
	});

	// add qs component
	return url + (~url.indexOf('?') ? '&' : '?') + linkedParams.join('&');
}
