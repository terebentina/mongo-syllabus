class MixinBuilder {
	constructor(superclass) {
		this.superclass = superclass;
	}

	with() {
		return Array.from(arguments).reduce((c, m) => m(c), this.superclass);
	}
}

const mix = (superclass) => new MixinBuilder(superclass);

export default mix;
