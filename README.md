# Battery
An atomic CSS generator

## Setup
```
npm install --dev bttry
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
export const keywords = battery.baseKeywords(config)

**colors**
export const colors = battery.baseColors(config)

**integers**
export const integers = battery.baseIntegers(config)

**colorHex**
Takes a color name that exists in the systemColors object in your config and returns its hex value. This is useful when used in conjunction with defaultValue.

**lengths**
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