# Moving zeros to the end

>Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

```js
function moveZeros(arr) {
	const a = arr.filter(i => i !== 0)
	return a.concat(Array(arr.length - a.length).fill(0))
}
```

## Honorable mentions
This is a nice one-liner, but it has to filter the array twice for no reason:
```js
function (arr) {
  return arr.filter(function(x) {return x !== 0}).concat(arr.filter(function(x) {return x === 0;}));
}
```

Overall, I think my way was best :)
