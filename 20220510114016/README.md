# IP Validation

I've actually done this one before in a few languages, but not Go (yet)!

First attempt... new at Go so I'm sure this could improve:
```go
package kata

import (
	"regexp"
	"strconv"
	"strings"
)

func Is_valid_ip(ip string) bool {
	re := regexp.MustCompile(`(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})`)
	octets := re.FindStringSubmatch(ip)
	if len(octets) == 0 {
		return false
	}
	for _, octet := range octets[1:] {
		if strings.HasPrefix(octet, "0") && octet != "0" {
			return false
		}
		if num, _ := strconv.Atoi(octet); num > 255 {
			return false
		}
	}
	return true
}
```

Well, it was a good exercise in logic, but the better option is always not
reinventing the wheel... especially when the wheel is in a standard library!
```go
package kata

import (
	"net"
)

func Is_valid_ip(ip string) bool {
	// ParseIP returns nil if it can't be parsed
	return net.ParseIP(ip) != nil
}
```

Just goes to show, tasks like this are usually solved problems. It's good
exercise to implement it (like a bubble sort) but usually a waste of
productivity in the real world. An ounce of documentation and research is
worth a pound of repeated code!

## Related
- https://github.com/golang/go/wiki/SliceTricks