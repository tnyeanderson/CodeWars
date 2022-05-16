# Counting duplicates

>Write a function that will return the count of distinct case-insensitive alphabetic characters and
>numeric digits that occur more than once in the input string. The input string can be assumed to
>contain only alphabets (both uppercase and lowercase) and numeric digits.

First attempt:
```go
package kata

import "strings"

func duplicate_count(input string) int {
	counts := map[rune]int{}
	answer := 0
	for _, s := range strings.ToLower(input) {
    counts[s]++
		if counts[s] == 2 {
			answer++
		}
	}
	return answer
}
```

I submitted this as I'm curious to see how others would do it in go... it's not my native language :)

## Improvements

* Use a named return!
* Use shorter variable names, it's simple enough
* Combine increment and conditional

Now isn't that so much better?!
```go
package kata

import "strings"

func duplicate_count(str string) (a int) {
	m := map[rune]int{}
	for _, s := range strings.ToLower(str) {
		if m[s]++; m[s] == 2 { a++ }
	}
	return
}
```


