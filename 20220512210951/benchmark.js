function percentDiff(a, b) {
	const percent = (a < b) ? (b - a) / a : (a - b) / b
	return percent * 100
}

const f1Name = 'my way'
function f1(ints) {
	let sum = 0
	for (let i=0; i<ints.length; i++) {
		const val = ints[i]
		const mod = Math.abs(val) % 2
		sum += mod
		if (sum === 1 || sum === i) {
			if (i > 2) {
				return val
			}
			if (i === 2) {
				// Expect remainder of 1 if looking for an odd (sum === 1), 0 if even (sum === 2)
				// The expected remainder is: (sum - 2) * -1
				return mod === -(sum-2) ? val : (ints[1] % 2 === -(sum-2)) ? ints[1] : ints[0]
			}
		}
	}
}

const f2Name = 'using filters'
function f2(integers) {
  const even = integers.filter(int => int % 2 === 0);
  const odd  = integers.filter(int => int % 2 !== 0);
  return even.length === 1 ? even[0] : odd[0];
}

function randomValue() {
		const plusOrMinus = Math.random() < 0.5 ? -1 : 1
		return Math.round(Math.random() * plusOrMinus * 1000000000)
}

function generateTestArrayPair(times) {
	// Generate a bunch of huge positive and negative values
	// Sort them into an "evens" array and an "odds" array
	// Append the first elements of these arrays to the other
	// Mimics the worst case scenario for my code (very last element)
	const evens = []
	const odds = []
	for (let i=0; i<times; i++) {
		const val = randomValue()
		if (val % 2 === 0) {
			evens.push(val)
		} else {
			odds.push(val)
		}
	}
	evens.push(odds[0])
	odds.push(evens[0])
	return [evens, odds]
}

function generateTestArrays(testsLength, arrayLength) {
	const out = []
	for (let i=0; i<testsLength; i++) {
		const pair = generateTestArrayPair(arrayLength)
		out.push(pair[0], pair[1])
	}
	return out
}

const iterations = 1000

let tests = []

function setupTests() {
	document.getElementById('results').innerHTML += `<div>Generating test data...</div>`
	tests = generateTestArrays(1000, 100)
	console.log(tests)
}

function runBenchmark() {
	let startTime, stopTime

	setupTests()

	document.getElementById('results').innerHTML += `<div>Running tests...</div>`
	// Measure using is integer
	startTime = Date.now()
	for (let i = 0; i < iterations; i++) {
		tests.forEach(test => {
			f1(test)
		})
	}
	stopTime = Date.now()
	let f1Time = stopTime - startTime

	// Measure using modulus
	startTime = Date.now()
	for (let i = 0; i < iterations; i++) {
		tests.forEach(test => {
			f2(test)
		})
	}
	stopTime = Date.now()
	let f2Time = stopTime - startTime

	const winner = (f1Time < f2Time) ? f1Name : f2Name

	document.getElementById('results').innerHTML = `<div>Using ${f1Name}: ${f1Time}</div>`
	document.getElementById('results').innerHTML += `<div>Using ${f2Name}: ${f2Time}</div>`
	document.getElementById('results').innerHTML += `<div>Winner: ${winner}</div>`
	document.getElementById('results').innerHTML += `<div>Percent difference: ${percentDiff(f1Time, f2Time)}%</div>`
}