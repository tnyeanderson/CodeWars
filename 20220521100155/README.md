# Sum of Digits / Digital Root

>Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing
>in this way until a single-digit number is produced. The input will be a non-negative integer.

Since we have to keep reducing until we have a single digit, recursion seems to be the answer here.

The thought process is: if the argument is one digit then return it, otherwise
convert the argument to a string, loop through the runes summing them up, and recurse with the summed
value. First attempt:
```go
package kata

import (
	"fmt"
	"strconv"
)

func DigitalRoot(n int) int {
	if n < 10 {
		return n
	}
	a := int64(0)
	for _, s := range fmt.Sprint(n) {
		v, _ := strconv.ParseInt(string(s), 10, 64)
		a += v
	}
	return DigitalRoot(int(a))
}
```

This recursion could instead be flattened to a loop:
```go
package kata

import (
	"fmt"
	"strconv"
)

func DigitalRoot(n int) int {
	for n > 9 {
		a := int64(0)
		for _, s := range fmt.Sprint(n) {
			v, _ := strconv.ParseInt(string(s), 10, 64)
			a += v
		}
		n = int(a)
	}
	return n
}
```

Could also use math. How would that look:
```go
package kata

func DigitalRoot(n int) int {
  s := DigitalSum(n)
  if s > 9 {
    return DigitalRoot(s)
  }
  return s
}

func DigitalSum(n int) int {
  if n > 9 {
	  r := n - ((n / 10) * 10)
    return r + DigitalSum(n/10)
  }
	return n
}
```

I think using math is the most elegant solution, it has no dependencies, and it's pretty readable! It's
also *way* faster:
```
Using  recurse:  2022684   588.1  ns/op
Using  loop:     2080124   591.9  ns/op
Using  math:     61061488  20.06  ns/op
```

So I answered with the math method.

## Improvements
I found a better looping/math method:
```go
package kata

func DigitalRoot(n int) int {
  for n > 9 {
    n = (n / 10) + n%10
  }

  return n
}
```

I had to walk through this one on paper to understand it, but it makes sense. It's essentially adding the
last digit to the rest of the number, so you always end up summing all the numbers. Really elegant!

But what is *this*?
```go
package kata

func DigitalRoot(n int) int {
    return (n - 1) % 9 + 1
}
```

Of course it's super fast:
```
Using  algo:     1000000000  0.2919  ns/op
```

But why on earth does this work?? Let's try some examples to see if there is a pattern:
```
f(x) = (x - 1) % 9 + 1

f(12) => 11 % 9 + 1 => 2 + 1 => 3

f(16) => 15 % 9 + 1 => 6 + 1 => 7

f(195) => 194 % 9 + 1 => 5 + 1 => 5
1 + 9 + 4 = 14
1 + 4 = 5

f(8675309) => 8675308 % 9 + 1 => 1 + 1 => 2
8 + 6 + 7 + 5 + 3 + 0 + 9 = 38
3 + 8 = 11
1 + 1 = 2
```

I think I get it. For each group of 9 possible answers (first one includes special case `0` for 10
possible answers):
* `f(x = [0,9]) => x`
* `f(x = [10,18]) => x - 9`
* `f(x = [19,27]) => x - 18`

So `f(x)` is essentially the difference between `x` and its closest *non-inclusive* multiple of 9. So
to make it non-inclusive, we first do `x - 1` before taking `mod 9`. Then we simply add that `1` back
afterward!
```)
f(x) => (x - 1) % 9 + 1
```

Put another way, with the exception of `0`, no base 10 number may have a digital root of `0`. And since
`f(10) = 1` in base 10, the digital root answers just cycle:
```
f(1)  = 1
f(2)  = 2
f(3)  = 3
f(4)  = 4
f(5)  = 5
f(6)  = 6
f(7)  = 7
f(8)  = 8
f(9)  = 9
f(10) = 1
f(11) = 2
f(12) = 3
f(13) = 4
f(14) = 5
f(15) = 6
f(16) = 7
f(17) = 8
f(18) = 9
f(19) = 1
f(20) = 2
...
```

The only reason the `9` trick works is because we are in base 10. If we were in base 16, then
we would use the `15` trick!

## Related
* https://www.reddit.com/r/explainlikeimfive/comments/2s79sd/comment/cnmtw09/
* https://math.stackexchange.com/questions/1221698/why-is-the-sum-of-the-digits-in-a-multiple-of-9-also-a-multiple-of-9
