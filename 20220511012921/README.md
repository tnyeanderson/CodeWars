# Find the odd int

This was my initial attempt, just ideating:
```js
function findOdd(A) {
  A.sort((a, b) => a - b)
  let count = 0
  let checking = A[0]
  for (let a of A) {
    if (a === checking) {
      count++
    } else {
      if (count % 2) {
        return checking
      } else {
        count = 1
        checking = a
      }
    }
  }
  return checking
}
```

But before submitting I thought of a much better way!
```js
function findOdd(A) {
  const counts = {}
  A.forEach(a => {
    if (!counts[a]) {
      counts[a] = 0
    }
    counts[a]++
  })
  for (let a of Object.keys(counts)) {
    if (counts[a] % 2) {
      return Number(a)
    }
  }
}
```

I was happy with this, so I submitted.

## Improvements

Use a ternary instead of that ugly conditional:
```js
function findOdd(A) {
  const counts = {}
  A.forEach(a => {
    counts[a] ? counts[a]++ : counts[a] = 1
  })
  for (let a of Object.keys(counts)) {
    if (counts[a] % 2) {
      return Number(a)
    }
  }
}
```

## Honorable mentions

I like how terse this is, but it's hard to read and inefficient (iterates through
the whole array for each item until it finds the first odd count). My accepted
solution is at most `<2n`, where this is at most `n^2`! *Scenario: if last element
was the only odd with a count of 1.*
```js
function findOdd(arr) {
  return arr.find((item, index) => arr.filter(el => el == item).length % 2)
}
```

## Wow, XOR?

***OKAY, THIS IS A GAMECHANGER***

```js
function findOdd(A) {
  return A.reduce((a, b) => a ^ b);
}
```

**So clean! But what is it doing? Why does it work??**

I knew about XOR, but was never properly taught a practical use case for it. This is an
*incredibly elegant* use case. 

But what makes XOR work here? Well, if you XOR a value against itself, it "cancels out":
```
    01101101
XOR 01101101
------------
    00000000
```

So if any value in our array shows up an even number of times, each pair will cancel
each other out, and we will be left with only the values which were not canceled
out (those which appeared an odd number of times).

And since XOR is a commutative operation (the order of the operands does not matter),
the array doesn't need to be sorted beforehand.

This only works because the instructions state that we *know* only one number in the array
will be repeated an odd number of times.If more than one value could be repeated an odd number
of times, this technique would not work! The result would end up being all of the oddly
repeated items XOR'd together.

Best part? It runs in `n` every time with fully bitwise operations, so it's *stupid* fast.


## Related
* https://math.stackexchange.com/questions/293793/prove-xor-is-commutative-and-associative