package main

import (
	"fmt"
	"strconv"
	"testing"
)

func DigitalRootRecurse(n int) int {
	if n < 10 {
		return n
	}
	a := int64(0)
	for _, s := range fmt.Sprint(n) {
		v, _ := strconv.ParseInt(string(s), 10, 64)
		a += v
	}
	return DigitalRootRecurse(int(a))
}

func DigitalRootWithLoop(n int) int {
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

func DigitalRootWithMath(n int) int {
	s := DigitalSum(n)
	if s > 9 {
		return DigitalRootWithMath(s)
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

func DigitalRootAlgorithm(n int) int {
	return (n-1)%9 + 1
}

func main() {
	n := 167346
	res := testing.Benchmark(func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			DigitalRootRecurse(n)
		}
	})
	fmt.Println("Using recurse:", res)
	res = testing.Benchmark(func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			DigitalRootWithLoop(n)
		}
	})
	fmt.Println("Using loop:", res)
	res = testing.Benchmark(func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			DigitalRootWithMath(n)
		}
	})
	fmt.Println("Using math:", res)
	res = testing.Benchmark(func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			DigitalRootAlgorithm(n)
		}
	})
	fmt.Println("Using algo:", res)
}
