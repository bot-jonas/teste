import Widget from "../../widget.js";

class SampleGraph extends Widget {
	static type = "element";
	static kind = "graph-sample";
	static icon = "icon-graph-up";

	constructor(id, options={}) {
		super();

		this.id = id;
		this.options = options;
	}

	build_element() {
		const element_div = document.createElement("div");
		element_div.classList.add("widget");
		element_div.classList.add("element");
		element_div.classList.add("sample-graph");
		element_div.style.setProperty("--width-span", this.options.width_span);
		element_div.style.height = this.options.height + "px";

		Highcharts.chart(element_div, {
			chart: {
				type: 'spline',
				inverted: false
			},
			title: {
				text: this.options.title,
			},
			accessibility: {
				enabled: false,
			},
			xAxis: {
				reversed: false,
				title: {
					enabled: true,
					text: 'Altitude'
				},
				labels: {
					format: '{value} km'
				},
				accessibility: {
					rangeDescription: 'Range: 0 to 80 km.'
				},
				maxPadding: 0.05,
				showLastLabel: true
			},
			yAxis: {
				title: {
					text: 'Temperature'
				},
				labels: {
					format: '{value}°'
				},
				accessibility: {
					rangeDescription: 'Range: -90°C to 20°C.'
				},
				lineWidth: 2
			},
			legend: {
				enabled: false
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/>',
				pointFormat: '{point.x} km: {point.y}°C'
			},
			plotOptions: {
				spline: {
					marker: {
						enable: false
					}
				}
			},
			series: [{
				name: 'Temperature',
				data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
					[50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
			}]
		});

		return element_div;
	}
}

export default SampleGraph;