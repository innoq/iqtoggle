/*! iQToggle - v0.1.1 -   2014-02-05
  * https://github.com/innoq/iqtoggle
  * Copyright 2012-2014 innoQ Deutschland GmbH.
  * Licensed under the Apache License, Version 2.0.
  */

(function($) {

// -- private

/*
 * Establishs a connection between the elements to be toggled
 * and the event source (i.e. element(s) that can be selected or
 * changed).
 */
function IqToggle(selector, options) {
	this.el = $(selector);
	this.provider = options.provider;
	this.what = options.what ? options.what : "visible";

	var self = this;
	this.provider.each(function(i, node) {
		var el = $(node);
		if(el.is("option")) {
			el = el.parent();
		}
		el.on("change", $.proxy(self, "updateState"));
	});

	this.updateState();
}

/*
 * Updates the state (visible/invisible or enabled/disabled) of all
 * connected elements
 */
IqToggle.prototype.updateState = function() {
	var match = false;
	this.provider.each(function(i, node) {
		var el = $(node);
		var property = el.is("option") ? "selected" : "checked";
		match = match || el.prop(property);
		return !match;
	});

	if (this.what === "visible") {
		this.el[match ? "show" : "hide"]();
	} else if (this.what === "invisible") {
		this.el[match ? "hide" : "show"]();
	} else if (this.what === "enabled") {
		this.el.prop("disabled", !match);
	} else if (this.what === "disabled") {
		this.el.prop("disabled", match);
	}
};

// -- public

/**
 * TODO comment me
 */
$.fn.toggleIfSelected = function(selector, what, scope) {
	var provider = $(selector, scope);
	this.each(function(i, node) {
		new IqToggle(node, { provider: provider, what: what });
	});
};

// -------

}(jQuery));
