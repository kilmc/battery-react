# Battery
Battery is a JavaScript-based tool to create, monitor and document your Atomic CSS library. By generating all your atomic classes via Javascript, your system has a greater awareness of your styles, while your team can continue to use class names for style declaration throughout your codebase.

Core features:
- Generate an Atomic CSS library
- Generate a JSON object with all classes and values
- Generate documentation for your CSS library
- Generate a changelog when classes are added, removed or renamed

## Setup
Install Battery locally
```
npm install --dev bttry
```


**Creating your library**
Navigate to the folder where you want your library to live and run the following command, adding your library name.
```
bttry create [library-name]
```

**Adding a CSS property**
You can quickly add a config file for any CSS property by typing the following
```
~/your-lbrary-directory $ bttry add background-color
```
This will add a new file called `_background-color.js` to your `atomic/src` directory as well as

### Configure Battery
Open the `[library-name].config.js` file which lives at the root of your new library directory. This will contain all the initial config information to render a basic set of CSS properties into your new library.

#### The Config Object
This object contains all of your configuration options

#### The Compile Function

```
atomic/
  atomic.config.js
  output/
    atomic.min.css.gz
    atomic.list.json
    atomic.docs.html
    atomic.changelog.md
  src/
    _background-color.js
    _float.js
    _padding.js
    ...
```

## Class Config
This object is the core of Battery. Every time you want to add classes for a given property, you start by creating a class config.

```javascript
const borderWidths = {
  props: { 'border': 'border-width' },
  valueSeparator: '-'
  values: {
    'regular': '0.1rem',
    'medium': '0.2rem',
    'thick': '0.3rem'
  }
};
```
Output:
```css
.border-regular { border-width: 0.1rem }
.border-medium { border-width: 0.2rem }
.border-thick { border-width: 0.3rem }
```

### Class Config Paramaters
**Props (`object`)**
Set up the target property(ies) using the key to denote it in the classname and the value to the CSS property.

```javascript
// Single property
props: { border: 'border-color' }

// Single property with no class indicator
props: { '': 'display' }

// Multiple properties
props: {
  t: 'top',
  r: 'right',
  b: 'bottom',
  l: 'left'
}
```

**Sub Props (`object`)**
These are properties which are added to the prop to target a sub set of the css property. Note that the values in the subProps object are defined as an array to allow you to target multiple css properties and roll them up into a single classname.
```javascript
props: { border: 'border' }
subProps: {
  top: ['top'],
  right: ['right'],
  bottom: ['bottom'],
  left: ['left']
}

props: { m: 'margin' }
subProps: {
  t: ['top'],
  r: ['right'],
  b: ['bottom'],
  l: ['left'],
  x: ['left', 'right'],
  y: ['top', 'bottom']
}
```

## Values
At the core of Battery is a system to generate values for your library.
All values for the library can be defined as a key value pair inside an object.
```
values: {
  'bg-black': '#000',
  'bg-white': '#fff',
}
```
The `key` will be used for the class, the `value` will be combined with the prop in the

### Helpers

**defaultValue**

```javascript
values: defaultValue('1px solid #000')
```

**keywords**


**colors**


**integers**


**colorHex**
Takes a color name that exists in the systemColors object in your config and returns its hex value. This is useful when used in conjunction with defaultValue.

#### lengths
A universal function which takes some configuration parameters and an array of numbers to generate an object with key-values pairs of the classname indicator and corresponding css value.

Configurable parameters:

lengthUnit (string)
The type of unit you want to generate e.g. px, rem, %

unitIndicator (string)
This is used to indicate which unit type the given class represents.

valueConverters (array[functions])
Allows you to convert an array of numbers into whatever end value you desire e.g. rem, opacity, baseline grid multiple.

negative (boolean)
Adds your configured negativeValueIndicator to the class name and adds a minus in front of each value.

separator (string)
Allows you to add a separator between the property and the value in the class name. You can set a default separator for all values generated with this function by setting the lengthValueSeparator in your config object.

const lengths = battery.baseLengths(config)


valueConverter: remify (num)
Converts a pixel value to a rem value based on your baseFontSize

export const remify = battery.baseRemify(config)

valueConverter: scaler
Multiplies a number by your configured baseUnit. This can be used to generate a set of values which aligns with your baseline grid should you choose to add one.

export const scaler = battery.baseScaler(config)

valueConverter: opacify
Converts a number to a decimal for use in conjunction with CSS's opacity property.

export const opacify = battery.baseOpacify

Length Value Helpers
A set of helpers to generate various kinds of length units and
their corresponding classname indicator.
NOTE: All of these helpers take an array of numbers.

Percentages
export const percentages = (units, negative = false) => lengths({
  values: units,
  lengthUnit: '%',
  unitIndicator: "p"
});

Viewport Height
export const viewportHeights = (units, negative = false) => lengths({
  values: units,
  lengthUnit: 'vh',
  unitIndicator: "vh"
});

Viewport Width
export const viewportWidths = (units, negative = false) => lengths({
  values: units,
  lengthUnit: 'vh',
  unitIndicator: "vh"
});

export const pixels = (units, negative = false) => lengths({
  values: units,
  valueConverters: [remify],
  lengthUnit: 'rem',
  unitIndicator: "px"
});

export const scalers = (units, negative = false) => lengths({
  values: units,
  valueConverters: [remify, scaler],
  lengthUnit: 'rem'
});

Percentages
export const opacities = (units, negative = false) => lengths({
  values: units,
  valueConverters: [opacify],
  lengthUnit: '%',
  unitIndicator: "p"
});




## Adding classes

```
// Sample class object

// Input
display: {
  props: { d: 'display' },
  valueSeparator: '-'
  values: {
    b: 'block',
    i: 'inline',
    ib: 'inline-block',
    f: 'flex',
    if: 'inline-flex',
    n: 'none'
  }
}

// Output
.d-b { display: block }
.d-i { display: inline }
.d-ib { display: inline-block }
.d-f { display: flex }
.d-if { display: inline-flex }
.d-n { display: none }
```





```
{
  props: { '': 'position' }
  values: {
    static: 'static',
    absolute: 'absolute',
    relative: 'relative',
    fixed: 'fixed'
  }
}
```