import Toolbox from "./toolbox.js";
import LayoutManager from "./layout-manager.js";
import Workspace from "./workspace.js";
import LayoutTree from "./layout-tree.js";
import Properties from "./properties.js";

const layout_manager = new LayoutManager();

const toolbox = new Toolbox("#toolbox");
const workspace = new Workspace("#workspace", layout_manager, {
	num_columns: 12,
	row_gap: 8,
	column_gap: 8,
});
const layout_tree = new LayoutTree("#layout-tree .layout-tree-content", layout_manager);
const properties = new Properties("#properties .properties-content", layout_manager);

import VerticalContainer from "./widgets/containers/vertical.js";
import HorizontalContainer from "./widgets/containers/horizontal.js";
import SampleTable from "./widgets/elements/tables/sample.js";
import SampleGraph from "./widgets/elements/graphs/sample.js";

// Inicialização
let layout = [
	new VerticalContainer("vc1", [
		new SampleTable("st1", {
			title: "Tabela 1",
			width_span: 12,
			rows: 4,
			cols: 16,
		}),
		new HorizontalContainer("hc2"),
		new SampleTable("st2", {
			title: "Tabela 2",
			width_span: 12,
			rows: 4,
			cols: 32,
		}),
		new HorizontalContainer("hc1", [
			new SampleTable("st3", {
				title: "Tabela 3",
				width_span: 4,
				rows: 16,
				cols: 4,
			}),
			new SampleGraph("sg1", {
				title: "Gráfico 1",
				width_span: 8,
				height: 200,
			}),
		]),
		new HorizontalContainer("hc2", [
			new SampleTable("st4", {
				title: "Tabela 4",
				width_span: 4,
				rows: 4,
				cols: 4,
			}),
			new SampleTable("st5", {
				title: "Tabela 5",
				width_span: 4,
				rows: 4,
				cols: 4,
			}),
			new SampleTable("st6", {
				title: "Tabela 6",
				width_span: 4,
				rows: 4,
				cols: 4,
			}),
		]),
	]),
];

const layout_str = localStorage.getItem("layout");
if(layout_str !== null) layout = JSON.parse(layout_str);

layout_manager.load_layout(layout);

layout_manager.set_selected_widget(layout[0].children[0]);