'use strict';

const color = require('css-color-converter');

module.exports = {
	darken: function(value, frac) {
		const darken = 1 - parseFloat(frac);
		const rgba = color(value).toRgbaArray();
		const r = rgba[0] * darken;
		const g = rgba[1] * darken;
		const b = rgba[2] * darken;
		return color([r, g, b]).toHexString();
	},

	lighten: function(value, frac) {
		const lighten = 1 + parseFloat(frac);
		const rgba = color(value).toRgbaArray();
		const r = rgba[0] * lighten;
		const g = rgba[1] * lighten;
		const b = rgba[2] * lighten;
		return color([r, g, b]).toHexString();
	},
};
