import * as WIDGETS from "./widgets/all-widgets.js";

class Toolbox {
	widgets = {
		"Containers": {
			"Vertical": WIDGETS.VerticalContainer,
			"Horizontal": WIDGETS.HorizontalContainer,
		},
		"Tabelas": {
			"Sample": WIDGETS.SampleTable,
		},
		"Gráficos": {
			"Sample": WIDGETS.SampleGraph,
		},
	};

	constructor(base_element_query_selector) {
		this.base_element_query_selector = base_element_query_selector;

		this.build();
	}

	build() {
		const base_element = document.querySelector(this.base_element_query_selector);

		for(let section in this.widgets) {
			const section_div = document.createElement("div");
			section_div.classList.add("toolbox-section");
			base_element.appendChild(section_div);

			const title_span = document.createElement("span");
			title_span.classList.add("toolbox-section-title");
			title_span.innerText = section;
			section_div.appendChild(title_span);

			const section_items_div = document.createElement("div");
			section_items_div.classList.add("toolbox-section-items");
			section_div.appendChild(section_items_div);

			for(let tool in this.widgets[section]) {
				const tool_div = document.createElement("div");
				tool_div.classList.add("tool");
				tool_div.draggable = true;
				tool_div.title = tool;
				tool_div.widget = this.widgets[section][tool];
				section_items_div.appendChild(tool_div);

				const icon_span = document.createElement("span");
				icon_span.classList.add("tool-icon");
				icon_span.classList.add("icon");
				icon_span.classList.add(this.widgets[section][tool].icon);
				tool_div.appendChild(icon_span);
			}
		}
	}


}

export default Toolbox;