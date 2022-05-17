# Are the numbers in order

>In this Kata, your function receives an array of integers as input. Your task is to determine whether
>the numbers are in ascending order. An array is said to be in ascending order if there are no two adjacent
>integers where the left integer exceeds the right integer in value.

First attempt. This works, but the logic is confusing:
```go
package kata

func InAscOrder(numbers []int) bool {
	for i, v := range numbers {
		if i == len(numbers)-1 {
			return true
		}
		if v > numbers[i+1] {
			return false
		}
	}
	return true
}
```

We can do better:
```go
package kata

func InAscOrder(n []int) bool {
	for i, v := range n {
		if i > 0 && v < n[i-1] {
			return false
		}
	}
	return true
}
```

That's what I was looking for. Final answer!

## Improvements

Of course there is a library...
```go
package kata

import (
	"sort"
)

func InAscOrder(n []int) bool {
	return sort.IntsAreSorted(n)
}
```

Other than that, my answer is best!
