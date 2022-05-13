# Find the parity outlier

>You are given an array (which will have a length of at least 3, but could be very large) containing integers.
>The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single
>integer N. Write a method that takes the array as an argument and returns this "outlier" N.

I had to think about this one for a bit and my strategy drastically changed over time. Here was my basic deduction:
* The modulus of `num % 2` is `0` for evens and `1` for odds.
* Tracking a sum of these remainder values could be used to see whether we are looking for evens or odds
  * If we are looking for an odd number, the modulus sum at the answer will be `1`
  * If we are looking for an even number, the modulus sum at the answer will be `n-1` (which is the same as the current index)
    * If all numbers were odd up until this point, then the sum would be `n`.
* We cannot solve until the third element (we wouldn't know whether the majority are even or are odd yet)
  * `0` and `3` just mean "all even" or "all odd" respectively--meaning we don't have the answer yet
  * If the sum is `1`, then whichever is odd (has modulus `1`) is the answer
  * If the sum is `2`, then whichever is even (has modulus `0`) is the answer
* If all third element cases are handled, and we are the fourth element (or later), and if either of the above tests pass (`sum === 1 || sum === i`), then the current element is the answer.

From that, the first decent logic tree was tested... and it worked!
```js
function findOutlier(integers) {
	let sum = 0
	for (let i=0; i<integers.length; i++) {
		const value = integers[i]
		const mod = value % 2
		sum += mod
		if (i === 2) {
			// Third element is the most complex
			if (sum === 1) {
				// Whichever is odd is the answer
				return mod === 1 ? value : (integers[1] % 2 === 1) ? integers[1] : integers[0]
			}
			if (sum === 2) {
				// Whichever is even is the answer
				return mod === 0 ? value : (integers[1] % 2 === 0) ? integers[1] : integers[0]
			}
		}
		if (i >= 3) {
			// On the fourth element, we can always solve for the answer
			// If the sum is n-1 (the index), then we have the even number answer
			// If the sum is 1, then we have the odd number answer
			if (sum === i || sum === 1) {
				return value
			}
		}
	}
}
```

But I knew I could do some refining. Start by removing some repeated code:
```js
function findOutlier(integers) {
	let sum = 0
	for (let i=0; i<integers.length; i++) {
		const value = integers[i]
		const mod = value % 2
		sum += mod
		if (i === 2 && (sum === 1 || sum === 2)) {
			// Expect remainder of 1 if looking for an odd, 0 if even
			const expected = (sum === 1) ? 1 : 0
			return mod === expected ? value : (integers[1] % 2 === expected) ? integers[1] : integers[0]
		}
		if (i >= 3) {
			if (sum === i || sum === 1) {
				return value
			}
		}
	}
}
```

Then realize that switching the parent/child of the logic tree is even less repeated code:
```js
function findOutlier(integers) {
	let sum = 0
	for (let i=0; i<integers.length; i++) {
		const value = integers[i]
		const mod = value % 2
		sum += mod
		if (sum === 1 || sum === i) {
			if (i > 2) {
				return value
			}
			if (i === 2) {
				// Expect remainder of 1 if looking for an odd (sum === 1), 0 if even (sum === 2)
				const expected = (sum === 1) ? 1 : 0
				return mod === expected ? value : (integers[1] % 2 === expected) ? integers[1] : integers[0]
			}
		}
	}
}
```

Then realize that the ternary can be replaced by magic math, and a variable eliminated!
```js
function findOutlier(integers) {
	let sum = 0
	for (let i=0; i<integers.length; i++) {
		const value = integers[i]
		const mod = value % 2
		sum += mod
		if (sum === 1 || sum === i) {
			if (i > 2) {
				return value
			}
			if (i === 2) {
				// Expect remainder of 1 if looking for an odd (sum === 1), 0 if even (sum === 2)
				// The expected remainder is: (sum - 2) * -1
				return mod === -(sum-2) ? value : (integers[1] % 2 === -(sum-2)) ? integers[1] : integers[0]
			}
		}
	}
}
```

Final cleanup, time to submit. I think there will probably be some clever solution, but I think my way
is extremely efficient and I'm happy with it.
```js
function findOutlier(ints) {
	let sum = 0
	for (let i=0; i<ints.length; i++) {
		const val = ints[i]
		const mod = val % 2
		sum += mod
		if (sum === 1 || sum === i) {
			if (i > 2) {
				return val
			}
			if (i === 2) {
				// Expect remainder of 1 if looking for an odd (sum === 1), 0 if even (sum === 2)
				// The expected remainder is: (sum - 2) * -1
				return mod === -(sum-2) ? val : (ints[1] % 2 === -(sum-2)) ? ints[1] : ints[0]
			}
		}
	}
}
```

Some of the remote tests failed because of negative values. Add a `Math.abs()` and successfully submit!
```js
function findOutlier(ints) {
	let sum = 0
	for (let i=0; i<ints.length; i++) {
		const val = ints[i]
		const mod = Math.abs(val) % 2
		sum += mod
		if (sum === 1 || sum === i) {
			if (i > 2) {
				return val
			}
			if (i === 2) {
				// Expect remainder of 1 if looking for an odd (sum === 1), 0 if even (sum === 2)
				// The expected remainder is: (sum - 2) * -1
				return mod === -(sum-2) ? val : (ints[1] % 2 === -(sum-2)) ? ints[1] : ints[0]
			}
		}
	}
}
```

## Honorable mentions
This type of answer is elegant and understandable, but *always* runs in `2n`:
```js
function findOutlier(integers){
  const even = integers.filter(int => int % 2 === 0);
  const odd  = integers.filter(int => int % 2 !== 0);
  return even.length === 1 ? even[0] : odd[0];
}
```
>The instructions specifically state that the array could be "very large". My version runs in
>`n+1` at worst (scenario: answer is at index `0` or `1` and the array length is `3`, AKA when
>performance would be negligible). Otherwise it only has to iterate until it reaches the element
>which contains the answer... which is damn well about as good as it gets!

The tradeoff here is that my answer does call `Math.abs()` on every iteration... so which is
better in the real world? Let's [benchmark](benchmark.html) it with large arrays of random values:
```
Using my way: 645
Using using filters: 4850
Winner: my way
Percent difference: 651.937984496124%
```

Wow! And every iteration of the benchmark test is the worst case scenario for my function... and it
still kicks filters' ass!

## Improvements
I think my favorite solution I saw was this (edited for my preference):
```js
function findOutlier(integers){
	const even = num => num % 2 === 0
	const odd = num => !even(num)
	return integers.slice(0,3).filter(even).length >= 2 ? integers.find(odd) : integers.find(even)
}
```

There's a lot of things that make this elegant. First, reusing the `even()` logic by inverting it to
check for odds. Second, it runs in `n+3` at worst (scenario: answer is last element) which, for the
operations being performed, is for all practical purposes identical to my version. But look how much
more readable this is! Mine is full of magic math, which is great for speed, but *this solution requires
no real speed sacrifice!*

I had thought of something like this (using the first three elements to determine what to look for, then
look for it), but I got too caught up in efficiency that I forgot about what's oftentimes much more important:
readability. Not only that, but I was literally chasing `2`... not `2n`, not `n+2`... `2`. What a waste of time!

... Or was I? I decided to run a [benchmark](benchmark2.html) to be sure, and the results surprised me:
```
Using my way: 6062
Using using find: 19221
Winner: my way
Percent difference: 217.073573078192%
```

It takes over 3x as long to run using the beautiful `.find()` strategy above! Though I think my Big O math is
correct, so it must be that calling `find()` is somehow causing a performance hit. Reading the docs, I'm not
sure why:

>The find method executes the callbackFn function once for each index of the array until the callbackFn returns a
>truthy value. If so, find immediately returns the value of that element.

All this benchmarking was done in Firefox and could be implementation-specific, but the numbers don't lie here!

## Final decision
If peformance was *absolutely critical* for this, I would go with my solution. Otherwise, I would probably opt for
the performance hit using `.filter()` for the improved readability and maintainability. It would just depend on context.
