class Properties {
	constructor(base_element_query_selector, layout_manager) {
		this.base_element = document.querySelector(base_element_query_selector);
		this.layout_manager = layout_manager;

		this.initialize();
	}

	initialize() {
		this.layout_manager.add_event_listener("update", this.on_layout_update.bind(this));
	}

	on_layout_update(event) {
		if(event.type === "selected_widget") {
			this.base_element.textContent = "";

			if(event.data.current !== null) {
				this.build_properties(event.data.current);
			}
		}
	}

	build_properties(widget) {
		const property_titles = {
			title: "Título",
			width_span: "Width span",
			height: "Height",
			rows: "Linhas",
			cols: "Colunas",
		};

		const property_id_el = document.createElement("span");
		property_id_el.classList.add("property-id");
		property_id_el.innerText = `ID: ${widget.id}`;
		this.base_element.appendChild(property_id_el);

		const options = widget.options;
		for(let option in options) {
			const property_id = `property-${option}`;
			const property_title = property_titles[option];

			const property_el = document.createElement("div");
			property_el.classList.add("property");
			this.base_element.appendChild(property_el);

			const property_label = document.createElement("label");
			property_label.for = property_id;
			property_label.innerText = property_title;
			property_el.appendChild(property_label);

			const property_input = document.createElement("input");
			property_input.type = "number";
			property_input.id = property_id;
			property_el.appendChild(property_input);

			property_input.min = 1;

			if(option === "width") {
				// FIXME: Check for root
				if(element.parentElement.widget.kind == "column") {
					property_input.max = get_width_span(element.parentElement);
				} else if(element.parentElement.widget.kind == "row") {
					let free_width = num_columns;
					for(let c of element.parentElement.children) {
						if(c != element) {
							free_width -= get_width_span(c);
						}
					}
					property_input.max = free_width;
				}
			} else if (option === "height") {
				property_input.max = 500;
			} else if(option === "title") {
				property_input.type = "text";

			}

			property_input.oninput = () => {
				this.validate_input(property_input, options[option]);
				widget.options[option] = parseInt(property_input.value);

				if(option === "width") {
					element.style.setProperty("--width-span", property_input.value); // FIXME: Update parents width
				} else if(option === "height") { // graph only
					element.querySelector("[data-highcharts-chart]").style.height = property_input.value + "px";
				} else if(option === "rows" || option === "cols") { // table only
					const table = element.querySelector(".sample-table-wrapper");
					table.outerHTML = `<sample-table width=${widget.options.width} rows=${widget.options.rows} cols=${widget.options.cols} />`;
					build_sample_tables();
				}
			}

			property_input.value = options[option];
		}
	}

	validate_input(inp, option) {
		const value = parseInt(inp.value);
		const min = parseInt(inp.min);
		const max = inp.max === undefined ? undefined : parseInt(inp.max);

		if(max != undefined && value > max) inp.value = max;
		if(min != undefined && value < min) inp.value = min;
	}
}

export default Properties;