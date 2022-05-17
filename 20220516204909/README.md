# Growth of a population

>In a small town the population is p0 = 1000 at the beginning of a year. The population regularly
>increases by 2 percent per year and moreover 50 new inhabitants per year come to live in the town.
>How many years does the town need to see its population greater or equal to p = 1200 inhabitants?

First attempt, and final submission:
```go
package kata

func NbYear(p0 int, percent float64, aug int, p int) (y int) {
	total := p0
  for total < p {
    total += int(float64(total) * percent * 0.01) + aug
		y++
  }
	return
}
```

Perhaps we should think recursively:
```go
package kata

func NbYear(p0 int, percent float64, aug int, p int) (int) {
  var r func(int, float64, int, int, int) int
	r = func(p0 int, percent float64, aug int, p int, c int) int {
    if p0 >= p {
		  return c
	  }
	  p1 := p0 + int(float64(p0) * percent * 0.01) + aug
	  return r(p1, percent, aug, p, c + 1)
  }
  return r(p0, percent, aug, p, 0)
}
```

Wow, that's ugly isn't it? Recursion is great for some tasks, but for some it's just
less clear for no real benefit. The loop is shorter, more readable, easier to understand,
and maybe even faster... not gonna benchmark it this time though!

## Improvements

The best improvement I saw was to ditch the `total` variable and just use `p0`:
```go
package kata

func NbYear(p0 int, percent float64, aug int, p int) (y int) {
  for p0 < p {
    p0 += int(float64(p0) * percent * 0.01) + aug
		y++
  }
	return
}
```

I think that's about as good as it gets!!
