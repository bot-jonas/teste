class Widget {
	// Namespaces
	workspace = {};
	layout_tree = {};

	build_element() {
		throw new Error(`[Not Implemented] ${this.constructor.name}:build_element`);
	}
}

export default Widget;