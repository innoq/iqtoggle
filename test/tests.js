/*global module, test, strictEqual */

/* Copyright 2012-2014 innoQ Deutschland GmbH

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

(function ($) {

    "use strict";

    module("Select/Option");

    test("Check if target element is made visible correctly (no option explicitly selected)", function () {
        strictEqual($("#target").is(":visible"), true, "init state, #target is visible");
        $("#target").toggleIfSelected("#source option[value='bar']");
        strictEqual($("#target").is(":visible"), false, "toggle-hook added -> #target is invisible");

        $("#source").val("bar");
        $("#source").change();
        strictEqual($("#target").is(":visible"), true, "bar is selected -> #target is visible");

        $("#source").val("foo");
        $("#source").change();
        strictEqual($("#target").is(":visible"), false, "bar is selected -> #target is invisible");

        $("#source").val("baz");
        $("#source").change();
        strictEqual($("#target").is(":visible"), false, "bar is selected -> #target is invisible");
    });

    test("Check if target element is made visible correctly (bar explicitly selected)", function () {
        $("#source").val("bar");
        $("#source").change();
        strictEqual($("#source").val(), "bar", "bar is selected");

        strictEqual($("#target").is(":visible"), true, "init state, #target is visible");
        $("#target").toggleIfSelected("#source option[value='bar']");
        
        strictEqual($("#target").is(":visible"), true, "toggle-hook added -> #target is visible");

        $("#source").val("bar");
        $("#source").change();
        strictEqual($("#target").is(":visible"), true, "bar is selected -> #target is visible");

        $("#source").val("foo");
        $("#source").change();
        strictEqual($("#target").is(":visible"), false, "bar is selected -> #target is invisible");

        $("#source").val("baz");
        $("#source").change();
        strictEqual($("#target").is(":visible"), false, "bar is selected -> #target is invisible");
    });

    test("Check if two different toggles are not interfering", function () {
        strictEqual($("#target").is(":visible"), true, "init state, #target is visible");
        strictEqual($("#target2").is(":visible"), true, "init state, #target2 is visible");
        
        $("#target").toggleIfSelected("#source option[value='bar']");
        $("#target2").toggleIfSelected("#source2 option[value='bar']");
        
        strictEqual($("#target").is(":visible"), false, "toggle-hook added -> #target is invisible");
        strictEqual($("#target2").is(":visible"), false, "toggle-hook added -> #target2 is invisible");

        $("#source").val("bar");
        $("#source").change();
        strictEqual($("#target").is(":visible"), true, "source bar is selected -> #target is visible");
        strictEqual($("#target2").is(":visible"), false, "source bar is selected -> #target2 is invisible");

        $("#source2").val("bar");
        $("#source2").change();
        strictEqual($("#target").is(":visible"), true, "source2 bar is selected -> #target is visible");
        strictEqual($("#target2").is(":visible"), true, "source2 bar is selected -> #target2 is visible");

        $("#source").val("baz");
        $("#source").change();
        strictEqual($("#target").is(":visible"), false, "source baz is selected -> #target is invisible");
        strictEqual($("#target2").is(":visible"), true, "source baz is selected -> #target2 is visible");

        $("#source2").val("baz");
        $("#source2").change();
        strictEqual($("#target").is(":visible"), false, "source2 baz is selected -> #target is invisible");
        strictEqual($("#target2").is(":visible"), false, "source2 baz is selected -> #target2 is invisible");
    });

    test("Check if two toggels can subscribe to the same selectable input element (single selector)", function () {
        strictEqual($("#target").is(":visible"), true, "init state, #target is visible");
        strictEqual($("#target2").is(":visible"), true, "init state, #target2 is visible");
        
        // subscribe both to the first selection source
        $("#target").toggleIfSelected("#source option[value='bar']");
        $("#target2").toggleIfSelected("#source option[value='bar']");
        
        strictEqual($("#target").is(":visible"), false, "toggle-hook added -> #target is invisible");
        strictEqual($("#target2").is(":visible"), false, "toggle-hook added -> #target2 is invisible");

        $("#source").val("bar");
        $("#source").change();
        strictEqual($("#target").is(":visible"), true, "bar is selected -> #target is visible");
        strictEqual($("#target2").is(":visible"), true, "bar is selected -> #target2 is visible");

        $("#source").val("baz");
        $("#source").change();
        strictEqual($("#target").is(":visible"), false, "baz is selected -> #target is invisible");
        strictEqual($("#target2").is(":visible"), false, "baz is selected -> #target2 is invisible");
    });

    test("Check if two toggels can subscribe to the same selectable input element (multi selector)", function () {
        strictEqual($("#target").is(":visible"), true, "init state, #target is visible");
        strictEqual($("#target2").is(":visible"), true, "init state, #target2 is visible");
        
        // subscribe both to the first selection source
        $("#target, #target2").toggleIfSelected("#source option[value='bar']");
        
        strictEqual($("#target").is(":visible"), false, "toggle-hook added -> #target is invisible");
        strictEqual($("#target2").is(":visible"), false, "toggle-hook added -> #target2 is invisible");

        $("#source").val("bar");
        $("#source").change();
        strictEqual($("#target").is(":visible"), true, "bar is selected -> #target is visible");
        strictEqual($("#target2").is(":visible"), true, "bar is selected -> #target2 is visible");

        $("#source").val("baz");
        $("#source").change();
        strictEqual($("#target").is(":visible"), false, "baz is selected -> #target is invisible");
        strictEqual($("#target2").is(":visible"), false, "baz is selected -> #target2 is invisible");
    });

    test("Check if a toggels can subscribe to the two selectable input elements", function () {
        strictEqual($("#target").is(":visible"), true, "init state, #target is visible");
        strictEqual($("#target2").is(":visible"), true, "init state, #target2 is visible");
        
        // subscribe both to the first selection source
        $("#target").toggleIfSelected("#source option[value='bar'], #source2 option[value='bar']");
        
        strictEqual($("#target").is(":visible"), false, "toggle-hook added -> #target is invisible");

        // test OR semantics of the selection. Would be nicer with a decision table...
        
        $("#source").val("bar");
        $("#source").change();
        strictEqual($("#target").is(":visible"), true, "source bar is selected -> #target is visible");

        $("#source").val("baz");
        $("#source").change();
        strictEqual($("#target").is(":visible"), false, "source baz is selected -> #target is invisible");

        $("#source2").val("bar");
        $("#source2").change();
        strictEqual($("#target").is(":visible"), true, "source2 bar is selected -> #target is visible");

        $("#source2").val("baz");
        $("#source2").change();
        strictEqual($("#target").is(":visible"), false, "source2 baz is selected -> #target is invisible");

        $("#source").val("bar");
        $("#source").change();
        strictEqual($("#target").is(":visible"), true, "source bar is selected -> #target is visible");

        $("#source2").val("bar");
        $("#source2").change();
        strictEqual($("#target").is(":visible"), true, "source bar and source2 bar are selected -> #target is visible");

        $("#source2").val("baz");
        $("#source2").change();
        strictEqual($("#target").is(":visible"), true, "source bar and source2 baz are selected -> #target is visible");

        $("#source").val("baz");
        $("#source").change();
        strictEqual($("#target").is(":visible"), false, "source bar and source2 baz are selected -> #target is invisible");

    });

    module("Checkbox");
    test("Check if target element is made visible correctly (default mode, checkbox is unchecked)", function () {
        strictEqual($("#target3").is(":visible"), true, "init state, #target3 is visible");
        $("#target3").toggleIfSelected("#source3");
        strictEqual($("#target3").is(":visible"), false, "toggle hook added -> #target3 is invisible");

        $("#source3").prop("checked", true);
        $("#source3").change();
        strictEqual($("#source3").is(":checked"), true, "checkbox is selected.");
        strictEqual($("#target3").is(":visible"), true, "checkbox is selected -> #target3 is visible");
    });

    test("Check if target element is made invisible correctly (invisible mode, checkbox is unchecked)", function () {
        strictEqual($("#target3").is(":visible"), true, "init state, #target3 is visible");
        $("#target3").toggleIfSelected("#source3", "invisible");
        strictEqual($("#target3").is(":visible"), true, "toggle hook added -> #target3 is visible");

        $("#source3").prop("checked", true);
        $("#source3").change();
        strictEqual($("#source3").is(":checked"), true, "checkbox is selected.");
        strictEqual($("#target3").is(":visible"), false, "checkbox is selected -> #target3 is invisible");
    });

    test("Check if target element is enabled correctly (enabled mode, checkbox is unchecked)", function () {
        //make sure #target3 is enabled:
        $("#target3").prop("disabled", false);
        
        strictEqual($("#target3").is(":enabled"), true, "init state, #target3 is enabled");
        $("#target3").toggleIfSelected("#source3", "enabled");
        strictEqual($("#target3").is(":enabled"), false, "toggle hook added -> #target3 is disabled");

        $("#source3").prop("checked", true);
        $("#source3").change();
        strictEqual($("#source3").is(":checked"), true, "checkbox is selected.");
        strictEqual($("#target3").is(":enabled"), true, "checkbox is selected -> #target3 is enabled");
    });

    test("Check if target element is disabled correctly (disabled mode, checkbox is unchecked)", function () {
        //make sure #target3 is enabled:
        $("#target3").prop("disabled", false);

        strictEqual($("#target3").is(":enabled"), true, "init state, #target3 is enabled");
        $("#target3").toggleIfSelected("#source3", "disabled");
        strictEqual($("#target3").is(":enabled"), true, "toggle hook added -> #target3 is still enabled");

        $("#source3").prop("checked", true);
        $("#source3").change();
        strictEqual($("#source3").is(":checked"), true, "checkbox is selected.");
        strictEqual($("#target3").is(":enabled"), false, "checkbox is selected -> #target3 is disabled");
    });

    test("Check if target element is made visible correctly (checkbox is checked)", function () {
        $("#source3").prop("checked", true);
        $("#source3").change();
        strictEqual($("#source3").is(":checked"), true, "checkbox is selected.");
        
        strictEqual($("#target").is(":visible"), true, "init state, #target is visible");
        $("#target3").toggleIfSelected("#source3");
        strictEqual($("#target3").is(":visible"), true, "toggle hook added -> #target3 is visible");

        $("#source3").prop("checked", false);
        $("#source3").change();
        strictEqual($("#source3").is(":checked"), false, "checkbox is selected.");
        strictEqual($("#target3").is(":visible"), false, "checkbox is selected -> #target3 is invisible");
    });

    module("Radio buttons");

    test("Check if target element is made visible correctly (default mode, unselected radio buttons)", function () {
        strictEqual($("#target4").is(":visible"), true, "init state, #target3 is visible");

        strictEqual($("#radio1").is(":checked"), false, "radio1 is not selected.");
        strictEqual($("#radio2").is(":checked"), false, "radio2 is not selected.");
        
        $("#target4").toggleIfSelected("#radio1");
        strictEqual($("#target4").is(":visible"), false, "toggle hook added -> #target4 is invisible");

        $("#radio1").prop("checked", true);
        $("#radio1").change();
        strictEqual($("#radio1").is(":checked"), true, "radio1 is selected.");
        strictEqual($("#target4").is(":visible"), true, "radio1 is selected -> #target4 is visible");
        
        $("#radio2").prop("checked", true);
        $("#radio2").change();
        $("#radio1").change(); // for some reason, the change event for radio1 is not fired automatically
        strictEqual($("#radio1").is(":checked"), false, "radio1 is not selected.");
        strictEqual($("#radio2").is(":checked"), true, "radio2 is selected.");
        strictEqual($("#target4").is(":visible"), false, "radio2 is selected -> #target4 is invisible");
    });

    module("Glue Code");

    test("Check glue code use case", function () {
        // glue code
        $("[data-toggle]").each(function (i, node) {
            var el = $(node);
            var selector = el.data("toggle");
            el.toggleIfSelected(selector);
        });

        // test select/option
        strictEqual($("#target").is(":visible"), false, "toggle-hook added -> #target is invisible");

        $("#source").val("bar");
        $("#source").change();
        strictEqual($("#target").is(":visible"), true, "bar is selected -> #target is visible");

        $("#source").val("foo");
        $("#source").change();
        strictEqual($("#target").is(":visible"), false, "bar is selected -> #target is invisible");

        $("#source").val("baz");
        $("#source").change();
        strictEqual($("#target").is(":visible"), false, "bar is selected -> #target is invisible");
        
        // test checkbox
        strictEqual($("#target3").is(":visible"), false, "toggle hook added -> #target3 is invisible");

        $("#source3").prop("checked", true);
        $("#source3").change();
        strictEqual($("#source3").is(":checked"), true, "checkbox is selected.");
        strictEqual($("#target3").is(":visible"), true, "checkbox is selected -> #target3 is visible");
    });

}(jQuery));
