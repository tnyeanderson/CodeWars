# Your order, please

Initial attempt:
```js
function order(words){
  const out = []
  words.split(' ').forEach(word => {
    if (word) {
      const num = word.match('[0-9]')[0] - 1
      out[num] = word
    }
  })
  return out.join(' ')
}
```

First thing to improve is to use the `/\d/` regex syntax. I knew it was there
but I searched in the spec and didn't see it right away and gave up. Been too
focused on other languages recently...
```js
function order(words){
  const out = []
  words.split(' ').forEach(word => {
    if (word) {
      const num = word.match(/\d/)[0] - 1
      out[num] = word
    }
  })
  return out.join(' ')
}
```

While I think this code is clear, I noticed some responses using a sort function
which is *way* cooler. Unfortunately, I suspect it's also less efficient:
```js
function order(words){
  words.split(' ').sort((a, b) => {
		return a.match(/\d/) - b.match(/\d/)
  }).join(' ')
}
```

Let's [benchmark](benchmark.html) it using a [script](benchmark.js)!
```
Using assignment: 61
Using sort: 564
Winner: assigning
Percent difference: 824.5901639344263%
```

I was right. Turns out `n` is better than `>=2n`! That plus calling `match()` twice
for each item, each iteration would certainly add up!

Of course, with the given problem definition (`count(words) <= 9`), that efficiency
wouldn't have any material effect (unless doing it 30,000 times like we did for the
benchmark), and I think the `sort` method might be just a *little* bit more readable,
so in this case I would probably still use it.
