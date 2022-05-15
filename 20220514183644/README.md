# Find the missing letter

Spec:
```
["a","b","c","d","f"] -> "e"
["O","Q","R","S"] -> "P"
```

First draft:
```js
function findMissingLetter(arr) {
  let answer = arr.pop().charCodeAt(0)
  while (arr.length) {
    if (--answer > arr.pop().charCodeAt(0)) {
      return String.fromCharCode(answer)
    }
  }
}
```

Is it faster to use indexes?
```js
function findMissingLetter(arr) {
  let answer = arr[0].charCodeAt(0)
	for (let i=1; i<arr.length; i++) {
		if (++answer < arr[i].charCodeAt(0)) {
			return String.fromCharCode(answer)
		}
	}
}
```

When I made the [benchmark](benchmark.html) I had to be sure to put the missing letter in the middle of the test arrays, since
we iterate in different directions in each of our test functions... below are the correct results (some bugs in
my for loop code caused me to miscalculate that using pop was more efficient... it really wasn't)
```
Name                            Time   Percent diff   
------------------------------------------------------
findMissingLetterWithForIndex   1123   0%             
findMissingLetterWithWhile      1446   29%            

Winner: findMissingLetterWithForIndex
```

## Honorable mentions

I loved the cleverness of this solution, but it is quite a bit less efficient:
```js
function findMissingLetter(array) {
	let i = array[0].charCodeAt();
	return String.fromCharCode(array.find(el => el.charCodeAt() != i++).charCodeAt() - 1);
}
```

```
Name                            Time   Percent diff   
------------------------------------------------------
findMissingLetterWithForIndex   1129   0%             
findMissingLetterWithFind       6235   452%           

Winner: findMissingLetterWithForIndex
```

## Improvements

* `charCodeAt(0)` could be replaced by `charCodeAt()`.
