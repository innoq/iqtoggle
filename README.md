# iQToggle

[![Build Status](https://secure.travis-ci.org/innoq/iqtoggle.png)](http://travis-ci.org/innoq/iqtoggle)

iQToggle is a jQuery plugin to provide a declarative way for conditionally controlling the visibility of elements.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/innoq/iqtoggle/master/dist/iqtoggle.min.js
[max]: https://raw.github.com/innoq/iqtoggle/master/dist/iqtoggle.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="iqtoggle.min.js"></script>
...
<select id="source">
    <option value="good">Good decision</option>
    <option value="better">Better decision</option>
    <option value="best">Best decision</option>
</select>
<span id="conditional">Whooho! You made best best decision!</span>

<script>
    $("#conditional").toggleIfSelected("#source option[value='best']");
</script>
```

iQToggle will now subscribe to the change events of the ```#source``` select box
and will hide the ```#conditional``` span unless the _Best decision_ has been chosen.
This works as well for radio buttons and checkboxes.

## Documentation
_(Coming soon)_

## Examples

### Using iQToggle with semantic markup

```html
<select id="source">
    <option value="good">Good decision</option>
    <option value="better">Better decision</option>
    <option value="best">Best decision</option>
</select>
<span id="conditional" data-show-if-selected="#source option[value='best']">Whooho! You made best best decision!</span>

<script>
	// put this to your glue code
    $(function() {
		$("[data-show-if-selected]").each(function(i, node) {
			var el = $(node);
			var selector = el.data("show-if-selected");
			el.toggleIfSelected(selector);
		});
	});
</script>
```

This code snippet will connect all elements that are annotated with a ```data-show-if-selected``` 
attribute to the selection source that is given in the attribute.

_(More coming soon)_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 [innoQ Deutschland GmbH](http://www.innoq.com/en);
Licensed under the Apache License, Version 2.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

Please don't edit files in the `dist` subdirectory as they are generated via grunt. You'll find source code in the `src` subdirectory!

While grunt can run the included unit tests via PhantomJS, this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.
