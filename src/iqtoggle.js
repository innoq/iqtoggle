/* Copyright 2012 innoQ Deutschland GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
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
$.fn.toggleIfSelected = function(selector, what) {
	var provider = $(selector);
	this.each(function(i, node) {
		new IqToggle(node, { provider: provider, what: what });
	});
};

// -------

}(jQuery));
