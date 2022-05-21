#  Count IP addresses

>Implement a function that receives two IPv4 addresses, and returns the number of addresses between
>them (including the first one, excluding the last one). All inputs will be valid IPv4 addresses in
>the form of strings. The last address will always be greater than the first one.

Spec:
```
* With input "10.0.0.0", "10.0.0.50"  => return   50 
* With input "10.0.0.0", "10.0.1.0"   => return  256 
* With input "20.0.0.10", "20.0.1.0"  => return  246
```

First attempt:
```js
function ipsBetween(start, end){
	const s = start.split('.')
	const d = end.split('.').map((a, i) => a - s[i])
	return d.reduce((a, b, i) => a + (b * Math.pow(256, 3 - i)), 0)
}
```

Remove the unneeded `.map()`:
```js
function ipsBetween(start, end){
	const s = start.split('.')
	return end.split('.').reduce((a, b, i) => a + ((b - s[i]) * Math.pow(256, 3 - i)), 0)
}
```

I like that answer. Submitted.

## Improvements

I was intrigued by this technique:
```js
function ipsBetween(start, end){
	const toNum = ip => ip.split('.').reduce((acc, e) => acc * 256 + parseInt(e));  
	return toNum(end) - toNum(start);
}
```

This converts each IP to an integer, then subtracts them. It is probably less efficient, but that will be tested:
```
Name                     Time   Percent diff   
-----------------------------------------------
ipsBetweenConvertToNum   5556   0%             
ipsBetweenMyVersion      7209   30%            

Winner: ipsBetweenConvertToNum
```

**WHAT?** It's more efficient? How?

* `.split()` is called on `start` and `end` for both
* `.reduce()` is called once in my version, twice when converting to number
* Each time `reduce()` is called:
  * My version calls `Math.pow()` and accesses the `s` array
	* Converting to number calls `parseInt()`

This tells me that `parseInt` must be very fast compared to accessing an array by index *and* using `Math.pow()`.
However, the `s` array in my version is being accessed by index the same amount of times as it is iterated when
converting to number! That makes me think that `Math.pow()` must be the bottleneck here.
