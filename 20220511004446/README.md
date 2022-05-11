# Simple Pig Latin

First attempt. I think this is really good.
```js
function pigIt(str){
  return str
    .split(' ')
    .map(s => s.match(/\W/) ? s : (s + s[0]).slice(1) + 'ay')
    .join(' ')
}
```

While I'm quite happy with my first attempt (I tend to do these quickly),
I really liked some answers using regex capture groups! Namely something
like this:
```js
function pigIt(str) {
	return str.replace(/(\w)(\w*)/g, '\$2\$1ay')
}
```

Just so clever, understandable, and much more efficient. Love it!
