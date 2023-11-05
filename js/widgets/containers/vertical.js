import Widget from "../widget.js";

class VerticalContainer extends Widget {
	static type = "container";
	static kind = "vertical";
	static icon = "icon-layout-three-rows";

	constructor(id, children=[]) {
		super();

		this.id = id;
		this.children = children;
	}

	build_element() {
		const element = document.createElement("div");
		element.classList.add("widget");
		element.classList.add("vertical-container");
		if(this.children.length == 0) element.classList.add("empty-container");

		return element;
	}
}

export default VerticalContainer;