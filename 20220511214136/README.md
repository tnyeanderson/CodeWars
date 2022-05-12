# Find the next perfect square

First attempt:
```js
function findNextSquare(sq) {
  // Return the next square if sq is a perfect square, -1 otherwise
  const s = Math.sqrt(sq)
  return Number.isInteger(s) ? Math.pow(s+1, 2) : -1
}
```

## Improvements
Use modulus instead of `isInteger`.
```js
function findNextSquare(sq) {
  // Return the next square if sq is a perfect square, -1 otherwise
  const s = Math.sqrt(sq)
  return s % 1 === 0 ? Math.pow(s+1, 2) : -1
}
```

I assume this is faster but just for fun, let's [benchmark](benchmark.html) it:
```
Using isInteger: 6311
Using modulus: 5217
Winner: modulus
Percent difference: 20.969906076289053%
```

Yupp, modulus is faster. No surprise as it's a native arithmetic operation!
