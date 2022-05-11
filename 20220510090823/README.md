# Tribonacci Sequence

Original answer:
```js
function tribonacci(signature,n){
  //your code here
  if (n < 3) {
    return signature.slice(0, n)
  }
  for (let i=0, len=n-3; i<len; i++) {
    const sum = signature.slice(i, i + 3).reduce((x, y) => x + y)
    signature.push(sum)
  }
  return signature
}
```

After seeing other responses, the first improvement is removing the conditional:
```js
function tribonacci(signature,n){
  //your code here
  for (let i=0, len=n-3; i<len; i++) {
    const sum = signature.slice(i, i + 3).reduce((x, y) => x + y)
    signature.push(sum)
  }
  return signature.slice(0, n)
}
```

Next, stop using the `len` variable, it's not needed:
```js
function tribonacci(signature,n){
  //your code here
  for (let i=0; i<n-3; i++) {
    const sum = signature.slice(i, i + 3).reduce((x, y) => x + y)
    signature.push(sum)
  }
  return signature.slice(0, n)
}
```

And while the slices and reduces are clever (and show knowledge of array methods),
the more efficient answer is to *not* create new arrays (with `slice`) and *not* do
unneeded recursion (`reduce`)... I was originally going to do this, but decided against
it for bad reasons:
```js
function tribonacci(signature,n){
  //your code here
  for (let i=0; i<n-3; i++) {
    const sum = signature[i] + signature[i+1] + signature[i+2]
    signature.push(sum)
  }
  return signature.slice(0, n)
}
```

