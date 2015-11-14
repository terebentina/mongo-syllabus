import axios from 'axios';

export default {
	get: function(url, params) {
		return axios.get(url, {params: params}).then((response) => response.data);
	},

	put: function(url, params) {
		return axios.put(url, params).then((response) => response.data);
	},

	post: function(url, params) {
		return axios.post(url, params).then((response) => response.data);
	},

	delete: function(url, params) {
		return axios.delete(url, params).then((response) => response.data);
	},

	// @todo - see https://github.com/mzabriskie/axios/blob/master/COOKBOOK.md#jsonp
	jsonp: function(url, params) {
		return axios.get(url, {params: params});
	},
};
