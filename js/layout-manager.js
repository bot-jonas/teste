class LayoutManager {
	constructor() {
		this.selected_widget = null;

		this.event_listeners = {
			"load": [],
			"update": [],
		};
	}

	add_event_listener(event_name, callback) {
		this.event_listeners[event_name].push(callback);
	}

	emit_event(event_name, data) {
		this.event_listeners[event_name].forEach(l => l(data));
	}

	load_layout(layout) {
		this.layout = layout;
		this.emit_event("load", this.layout);
	}

	set_selected_widget(widget) {
		const previous = this.selected_widget;
		this.selected_widget = widget;

		this.emit_event("update", {
			type: "selected_widget",
			data: {
				current: this.selected_widget,
				previous,
			},
		});
	}
}

export default LayoutManager;