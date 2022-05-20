package main

import (
	"fmt"
	"regexp"
	"testing"
)

var testArr = [10]uint{1, 2, 3, 4, 5, 6, 7, 8, 9}

func CreatePhoneNumberRegex(n [10]uint) (p string) {
	for _, v := range n {
		p += fmt.Sprint(v)
	}
	re := regexp.MustCompile(`(\d{3})(\d{3})(\d{4})`)
	p = re.ReplaceAllString(p, `($1) $2-$3`)
	return
}

func CreatePhoneNumberOneLine(n [10]uint) (p string) {
	return fmt.Sprintf("(%d%d%d) %d%d%d-%d%d%d%d", n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9])
}

func CreatePhoneNumberWithUnpack(n [10]uint) string {
	var t []interface{}
	for _, v := range n {
		t = append(t, v)
	}
	return fmt.Sprintf("(%d%d%d) %d%d%d-%d%d%d%d", t...)
}

func main() {
	res := testing.Benchmark(func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			CreatePhoneNumberRegex(testArr)
		}
	})
	fmt.Println("Using regex:", res)
	res = testing.Benchmark(func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			CreatePhoneNumberOneLine(testArr)
		}
	})
	fmt.Println("Using one-liner:", res)
	res = testing.Benchmark(func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			CreatePhoneNumberWithUnpack(testArr)
		}
	})
	fmt.Println("Using unpack:", res)
}
