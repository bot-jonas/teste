import Widget from "../widget.js";

class HorizontalContainer extends Widget {
	static type = "container";
	static kind = "horizontal";
	static icon = "icon-layout-three-columns";

	constructor(id, children=[]) {
		super();

		this.id = id;
		this.children = children;
	}

	build_element() {
		const element = document.createElement("div");
		element.classList.add("widget");
		element.classList.add("horizontal-container");
		if(this.children.length == 0) element.classList.add("empty-container");

		return element;
	}
}

export default HorizontalContainer;