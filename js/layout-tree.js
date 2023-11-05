class LayoutTree {
	constructor(base_element_query_selector, layout_manager) {
		this.base_element = document.querySelector(base_element_query_selector);
		this.layout_manager = layout_manager;

		this.initialize();
	}

	initialize() {
		this.layout_manager.add_event_listener("load", this.on_layout_load.bind(this));
		this.layout_manager.add_event_listener("update", this.on_layout_update.bind(this));
	}

	on_layout_load(layout) {
		this.build_layout(layout);
	}

	on_layout_update(event) {
		if(event.type === "selected_widget") {
			event.data.previous?.layout_tree.element.classList.remove("selected-widget");
			event.data.current?.layout_tree.element.classList.add("selected-widget");
		}
	}

	build_layout(layout) {
		this.base_element.textContent = "";
		layout.forEach(w => this.build_layout_recursively(this.base_element, w));
	}

	build_layout_recursively(root_element, widget) {
		if(widget.constructor.type === "container") {
			const container = this.generate_layout_tree_node(widget);
			root_element.appendChild(container);
			widget.children.forEach(child => this.build_layout_recursively(container.querySelector(".layout-tree-children"), child));
		} else {
			root_element.appendChild(this.generate_layout_tree_node(widget));
		}
	}

	generate_layout_tree_node(widget) {
		const node = document.createElement("div");
		node.classList.add("layout-tree-node");
		widget.layout_tree.element = node;

		// Node value
		const node_value = document.createElement("div");
		node_value.classList.add("layout-tree-value");
		node.appendChild(node_value);

		const node_icon_toggle_children = document.createElement("span");
		node_icon_toggle_children.classList.add("icon");
		node_icon_toggle_children.classList.add("icon-caret-down-fill");
		node_icon_toggle_children.classList.add("icon-toggle-children");
		node_value.appendChild(node_icon_toggle_children);

		if(!widget.children) node_icon_toggle_children.style.visibility = "hidden";

		const node_icon_type = document.createElement("span");
		node_icon_type.classList.add("icon");

		node_icon_type.classList.add(widget.constructor.icon);
		
		node_value.appendChild(node_icon_type);

		const node_value_id = document.createElement("span");
		node_value_id.classList.add("layout-tree-value-id");
		node_value.appendChild(node_value_id);
		node_value_id.innerText = widget.id;

		// Node children
		const node_children = document.createElement("div");
		node_children.classList.add("layout-tree-children");
		node.appendChild(node_children);

		// Sync hover between workspace and layout tree panels
		node_value.onmouseover = () => {
			widget.workspace.element.classList.add("widget-hover");
		};

		node_value.onmouseout = () => {
			widget.workspace.element.classList.remove("widget-hover");
		};

		// Toggle node children visibility
		node_icon_toggle_children.onclick = () => {
			if(node_children.style.display === "none") {
				node_children.style.display = "block";
				node_icon_toggle_children.classList.remove("icon-caret-right-fill");
				node_icon_toggle_children.classList.add("icon-caret-down-fill");
			} else {
				node_children.style.display = "none";
				node_icon_toggle_children.classList.remove("icon-caret-down-fill");
				node_icon_toggle_children.classList.add("icon-caret-right-fill");
			}
		};

		return node;
	}
}

export default LayoutTree;