# Create phone number

Spec:
```go
CreatePhoneNumber([10]uint{1,2,3,4,5,6,7,8,9,0})  // returns "(123) 456-7890"
```

My first instinct was to basically get one long string of digits, then use regex capture groups to format a phone
number out of them. This turned out to be way more complex in go! In javascript, it would be:
```js
function CreatePhoneNumber(numbers) {
	return numbers.join('').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
}
```

In go, it's more like this!
```go
package kata

import (
	"fmt"
	"regexp"
)

func CreatePhoneNumber(numbers [10]uint) (p string) {
	for _, n := range numbers {
		p += fmt.Sprint(n)
	}
	re := regexp.MustCompile(`(\d{3})(\d{3})(\d{4})`)
	p = re.ReplaceAllString(p, `($1) $2-$3`)
	return
}
```

So I needed something better. I could just use `fmt.Sprintf`, but can't use the unpack operator (`...`) with
and array of integers. This means that each of the items has to be explicitly passed. The array length of 10
is about my limit for when I would do this in real life. Curious to see the performance difference, this is
almost definitely the best:
```go
package kata

import (
	"fmt"
)

func CreatePhoneNumber(n [10]uint) string {
	return fmt.Sprintf("(%d%d%d) %d%d%d-%d%d%d%d", n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9])
}
```

Middle ground? What if we iterate over the array like in the first step, but instead of generating a string,
we create a generic array that *can* use the unpack operator(`...`). It's efficient, but not as clumsy looking!
```go
package kata

import (
	"fmt"
)

func CreatePhoneNumber(n [10]uint) string {
  var t []interface{}
  for _, v := range n {
    t = append(t, v)
  }
	return fmt.Sprintf("(%d%d%d) %d%d%d-%d%d%d%d", t...)
}
```

## Benchmarks
Let's benchmark it and see what performs best!
```
$ go run phonenumber.go
Using regex:      162051    7500 ns/op
Using one-liner:  2457332   477.7 ns/op
Using unpack:     1285125   920.5 ns/op
```

As expected, regex is the slowest, then using unpack (have to iterate through the array), and the fastest
was the one-liner which directly accesses the array elements by index. For this challenge, I used the one-liner
as my answer.

## Improvements
I still think my answer is the best after reviewing the other solutions.
