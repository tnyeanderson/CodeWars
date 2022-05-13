# Convert string to camel case

Complete the method/function so that it converts dash/underscore delimited words into camel casing.
The first word within the output should be capitalized only if the original word was capitalized
(known as Upper Camel Case, also often referred to as Pascal case). 

First attempt:
```js
function toCamelCase(str){
	return str.replace(/[-_](.)/g, (_, b) => b.toUpperCase())
}
```

## Improvements

Looks like `s[1]` provides the first match. This is more clear, more terse, and doesn't leave unused variables:
```js
function toCamelCase(str){
	return str.replace(/[-_](.)/g, s => s[1].toUpperCase())
}
```
