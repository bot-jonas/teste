import Widget from "../../widget.js";
import { range } from "../../../utils.js";

class SampleTable extends Widget {
	static type = "element";
	static kind = "table-sample";
	static icon = "icon-table";

	constructor(id, options={}) {
		super();

		this.id = id;
		this.options = options;
	}

	build_element() {
		const element_div = document.createElement("div");
		element_div.classList.add("widget");
		element_div.classList.add("element");
		element_div.classList.add("sample-table");
		element_div.style.setProperty("--width-span", this.options.width_span);

		const title_span = document.createElement("span");
		title_span.classList.add("title");
		title_span.innerText = this.options.title;
		element_div.appendChild(title_span);

		const scroll_wrapper_div = document.createElement("div");
		scroll_wrapper_div.classList.add("scroll-wrapper");
		element_div.appendChild(scroll_wrapper_div);

		const table = document.createElement("table");
		scroll_wrapper_div.appendChild(table);

		table.innerHTML = 
		range(this.options.rows)
		.map(
			r =>
			`<tr ${r === 0 ? 'class="header"' : ''}>` +
				range(this.options.cols)
				.map(c => `<td>L${r+1},C${c+1}</td>`)
				.join("")
			+ '</tr>'
		)
		.join("");

		return element_div;
	}
}

export default SampleTable;