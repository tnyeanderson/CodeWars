# Build tower

First attempt:
```js
function towerBuilder(nFloors) {
	const out = []
	for (let i=0; i<nFloors; i++) {
		const stars = '*'.repeat((2 * i) + 1)
		const spaces = ' '.repeat(nFloors - 1 - i)
		out.push(spaces + stars + spaces)
	}
	return out
}
```

The alternative is to prepend each item to the array instead of appending, thus working backwards:
```js
function towerBuilder(nFloors) {
	const out = []
	let biggestSpaces = nFloors - 1
	while (nFloors--) {
		const stars = '*'.repeat((2 * (nFloors)) + 1)
		const spaces = ' '.repeat(biggestSpaces - nFloors)
		out.unshift(spaces + stars + spaces)
	}
	return out
}
```

Which one is faster though? I really suspect that `push()` is faster, but let's benchmark it:
```
Using push: 16028
Using unshift: 21101
Winner: push
Percent difference: 31.65086099326179%
```

So push is slightly faster. I also think that pushing is more readable, so I submitted my final
response using `push()`.

## Improvements
I really like using destructuring and `.map` instead of creating an array to `.push` values to... And *yes*,
you need to use `[...Array(n)]` as `Array(n)` won't iterate properly with `.map()`:
```js
function towerBuilder(nFloors) {
	return [...Array(nFloors)].map((_, i) => {
		const stars = '*'.repeat((2 * i) + 1)
		const spaces = ' '.repeat(nFloors - 1 - i)
		return spaces + stars + spaces
	})
}
```

In case you're wondering, yes I [benchmarked it](benchmark2.html) and the difference was 9% in favor of push. But I think I'd
probably use it anyway unless there was a really compelling reason. I hate for loops.

Another difference in implementation I saw was using `i + i + 1` instead of `(2 * i) + 1` (I like the parenthesis even though
PEMDAS makes them unneeded). I like how it looks aesthetically, but I honestly think it's easier to logically understand with
the multiplication, and the fact that most submissions used multiplication provides evidence that it's more intuitive.