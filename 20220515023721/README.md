# Write number in expanded form

Spec:
```
expandedForm(12); // Should return '10 + 2'
expandedForm(42); // Should return '40 + 2'
expandedForm(70304); // Should return '70000 + 300 + 4'
```

First attempt:
```js
function expandedForm(num) {
  magnitude = Math.pow(10, String(num).length - 1)
  current = Math.round(num / magnitude) * magnitude
  return (current < 10) ? `${current}` : `${current} + ${expandedForm(num - current)}`
}
```

This could also be done with string manipulation (definitely slower):
```js
next = str => expandedForm(str.slice(1))

function expandedForm(num) {
	str = String(num)
	current = str[0].padEnd(str.length, '0')
  return (!Number(current)) ? `${next(str)}` : (str.length < 2) ? `${current}` : `${current} + ${next(str)}`
}
```

And here are my most clever (but almost certainly slowest) answers:
```js
function expandedFormCleverly(num) {
	return [...String(num)]
		.map((v, i, a) => Number(v) * Math.pow(10, (a.length - i - 1)))
		.filter(v => v)
		.join(' + ') 
}

// I think this is the most readable answer by a long shot
function expandedFormCleverlyWithPad(num) {
	return [...String(num)]
		.map((v, i, a) => v.padEnd(a.length - i, '0'))
		.filter(v => Number(v))
		.join(' + ') 
}
```

As always, gotta [benchmark](benchmark.html) it:
```
Name                          Time   Percent diff   
----------------------------------------------------
expandedFormWithMath          1049   0%             
expandedFormCleverly          6401   510%           
expandedFormCleverlyWithPad   7308   597%           
expandedFormWithStrings       11811  1026%          

Winner: expandedFormWithMath
```

11x slower to use string manipulation! I'm actually surprised that `.map().filter.join()` is
faster than the raw string manipulation with one traversal.

But as always, math is the fastest (and sometimes the easiest to understand). Final answer:
```js
const next = n => expandedForm()
function expandedForm(num) {
  const z = Math.pow(10, String(num).length - 1)
  const n = Math.round(num / z) * z
  return (n < 10) ? `${n}` : `${n} + ${expandedForm(num - n)}`
}
```

But when I tried to submit, it failed! After adding some strategic `console.log`s, I realized
that I had used `round` instead of `floor`, so `49` was rounding *up* (`50 + 9`). Let's fix that:
```js
function expandedForm(num) {
  const z = Math.pow(10, String(num).length - 1)
  const n = Math.floor(num / z) * z
  return (n < 10) ? `${n}` : `${n} + ${expandedForm(num - n)}`
}
```

But then, an even more fundamental issue... one that requires a refactor. If the last digit in `num`
is a `0`, then ` + 0` will always be appended. The quickest way to solve this is:
```js
function expandedForm(num) {
  function next(num) {
    const z = Math.pow(10, String(num).length - 1)
    const n = Math.floor(num / z) * z
    return (n < 10) ? `${n}` : `${n} + ${next(num - n)}`
  }
	return next(num).replace(' + 0', '')
}
```

Can also be written like this, which I like more, and used as my final answer:
```js
function expandedForm(num) {
  return (function next(num) {
    const z = Math.pow(10, String(num).length - 1)
    const n = Math.floor(num / z) * z
    return (n < 10) ? `${n}` : `${n} + ${next(num - n)}`
  })(num).replace(' + 0', '')
}
```

## Points of interest

```
Name                          Time   Percent diff   
----------------------------------------------------
expandedFormReplaceString     1312   29%            
expandedFormReplaceRegex      1392   36%            

Winner: expandedFormReplaceString
```

Surprisingly (to me), using `/ \+ 0$/` actually seems to take slightly longer than just ` + 0`. I
figured it would be optimized to search from the end of the string because of the `$`, but it doesn't
appear that way!

## Honorable mentions

Looks like most people went with the `.map().filter().join()` option... which is great! It's clean and
maintainable... but it's also 6x slower than using recursion and math! If I could take the performance
hit (AKA I know the numbers will be small or it won't run often) I would definitely take the tradeoff.
Otherwise, I'd use my (slightly more confusing) recursion method.

I did learn about using `~~` instead of `Math.floor()`, but that obfuscates the purpose of the code so
I decided not to use it.
