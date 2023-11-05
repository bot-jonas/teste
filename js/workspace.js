class Workspace {
	constructor(base_element_query_selector, layout_manager, options) {
		this.base_element = document.querySelector(base_element_query_selector);
		this.layout_manager = layout_manager;
		this.options = options;

		this.initialize();
	}

	initialize() {
		const resize_observer = new ResizeObserver(this.calculate_workspace_width.bind(this));
		resize_observer.observe(this.base_element);

		this.layout_manager.add_event_listener("load", this.on_layout_load.bind(this));
		this.layout_manager.add_event_listener("update", this.on_layout_update.bind(this));
	}

	calculate_workspace_width() {
		const workspace_width = this.base_element.clientWidth - 2 * this.options.column_gap;
		this.base_element.style.setProperty("--container-width", workspace_width + "px");
	}

	on_layout_load(layout) {
		this.build_layout(layout);
	}

	on_layout_update(event) {
		if(event.type === "selected_widget") {
			event.data.previous?.workspace.element.classList.remove("selected-widget");
			event.data.current?.workspace.element.classList.add("selected-widget");
		}
	}

	build_layout(layout) {
		this.base_element.textContent = "";

		this.base_element.style.setProperty("--num-columns", this.options.num_columns);
		this.base_element.style.setProperty("--row-gap", this.options.row_gap + "px");
		this.base_element.style.setProperty("--column-gap", this.options.column_gap + "px");

		layout.forEach(w => this.build_layout_recursively(this.base_element, w));
	}

	build_layout_recursively(root_element, widget) {
		const element = widget.build_element();
		element.widget = widget;
		widget.workspace.element = element;
		root_element.appendChild(element);

		if(widget.constructor.type === "container") {
			widget.children.forEach(w => this.build_layout_recursively(element, w));
		} else {
			element.onclick = () => {
				this.layout_manager.set_selected_widget(widget);
			}
		}

		// Sync hover between workspace and layout tree panels
		if(!(widget.constructor.type == "container" && widget.children.length > 0)) {
			element.onmouseover = () => {
				widget.layout_tree.element.classList.add("widget-hover");
			};

			element.onmouseout = () => {
				widget.layout_tree.element.classList.remove("widget-hover");
			};
		}
	}
}

export default Workspace;