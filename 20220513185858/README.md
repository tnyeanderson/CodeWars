# Highest scoring word

>Given a string of words, you need to find the highest scoring word.  
>Each letter of a word scores points according to its position in the alphabet: a = 1, b = 2, c = 3 etc.  
>You need to return the highest scoring word as a string.  
>If two words score the same, return the word that appears earliest in the original string.  
>All letters will be lowercase and all inputs will be valid.  

Grant the following:
```
'abcz'.charCodeAt(0)
'abcz'.charCodeAt(1)
'abcz'.charCodeAt(2)
'abcz'.charCodeAt(3)

// Results
97
98
99
122
```

So to get `a=1` from char code `a=97`, we just subtract `96`. Same goes for all the char codes.

First, let's write a function to get the sum of the characters in a string:
```js
function sumChars(word) {
	let sum = 0
	for (let letter of word) {
		sum += letter.charCodeAt(0) - 96
	}
	return sum
}
```

While I think that's probably the most readable and also probably the most efficient way, I wonder
if we can do something daisy chained for no particular reason at all:
```js
function sumChars(word) {
	return word.split('').reduce((a, b) => a + b.charCodeAt(0) - 96, 0)
}
```

Now we can call that function in our answer. My first strategy was to `sort()` in descending
order and take the first (highest) element:
```js
function high(x) {
	return x.split(' ').sort((a, b) => sumChars(b) - sumChars(a))[0]
}
```

This is intuitive but it recalculates the word-sums over and over if the array is out of
order, and we don't actually need the sorted array. We really only need the max, so we can
be *way* more efficient. This version runs in `n`:
```js
function high(x) {
	let answer = {sum: 0}
	x.split(' ').forEach(word => {
		let sum = sumChars(word)
		answer = (sum > answer.sum) ? {word, sum} : answer
	})
	return answer.word
}
```

Then I think... what if we used a filter?
```js
function high(x) {
	let max = 0
	return x.split(' ').filter(v => {
		let sum = sumChars(v)
		if (sum > max) {
			max = sum
			return true
		}
	}).pop()
}
```

Well, why don't we take an hour and improve our [benchmarking](benchmark.html) setup so we can test
all four at once:
```
Name                     Time   Percent diff   
-----------------------------------------------
highWithForEach          545    0%             
highWithFilter           562    3%             
highWithForEachChained   611    12%            
highWithSort             1567   188%           

Winner: highWithForEach
```

As I expected, using `sort` for this sucks. Using `filter` isn't that much slower, but I think it's
definitely less readable anyways, so why not just use the `forEach`? Also, the chained sum method was
not only less readable, but slower!

So for my final submission:
```js
function sumChars(word) {
	let sum = 0
	for (let letter of word) {
		sum += letter.charCodeAt(0) - 96
	}
	return sum
}

function high(x) {
	let answer = {sum: 0}
	x.split(' ').forEach(word => {
		let sum = sumChars(word)
		answer = (sum > answer.sum) ? {word, sum} : answer
	})
	return answer.word
}
```

## Honorable mentions

This is clever isn't it?
```js
function high(s){
  let as = s.split(' ').map(s=>[...s].reduce((a,b)=>a+b.charCodeAt(0)-96,0));
  return s.split(' ')[as.indexOf(Math.max(...as))];
}
```

But it doesn't look very fast. Let's [see](benchmark2.html):
```
Name           Time   Percent diff   
-------------------------------------
myAnswer       56979  0%             
cleverAnswer   86450  52%            

Winner: myAnswer
```

That's what I thought, it's 50% slower. It's also harder to parse, which of course makes for harder PRs when it
inevitably needs to be updated.

Out of all the other responses, I still think mine is the easiest to understand and maintain, and it's also the
fastest by a fair margin.

## Improvements
Depending on the project requirements, I might be willing to take the 20% [performance hit](benchmark2.html)
here to use `reduce()`:
```js
function high(x) {
	return x.split(' ').reduce((answer, word) => {
		let sum = word.split('').reduce((a, b) => a + b.charCodeAt(0) - 96, 0)
		return (sum > answer.sum) ? {word, sum} : answer
	}, {sum: 0}).word
}
```

```
Name             Time   Percent diff   
---------------------------------------
myAnswer         5536   0%             
highWithReduce   6754   22%            

Winner: myAnswer
```

This is probably my favorite answer overall. It's a good blend of readability and cleverness. I was trying to
use reduce before, but I didn't quite grasp how `reduce(f, initialValue)` worked. Once it clicked I wrote this in no time.
