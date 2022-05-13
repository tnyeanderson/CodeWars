function percentDiff(a, b) {
	const percent = (a < b) ? (b - a) / a : (a - b) / b
	return percent * 100
}

const f1Name = 'push'
function f1(nFloors) {
	const out = []
	for (let i = 0; i < nFloors; i++) {
		const stars = '*'.repeat((2 * i) + 1)
		const spaces = ' '.repeat(nFloors - 1 - i)
		out.push(spaces + stars + spaces)
	}
	return out
}

const f2Name = 'map'
function f2(nFloors) {
	return [...Array(nFloors)].map((_, i) => {
		const stars = '*'.repeat((2 * i) + 1)
		const spaces = ' '.repeat(nFloors - 1 - i)
		return spaces + stars + spaces
	})
}

function randomValue() {
	return Math.round(Math.random() * 1000)
}

const iterations = 1000

let tests = []

function setupTests() {
	document.getElementById('results').innerHTML += `<div>Generating test data...</div>`
	let count = 100
	while (count--) {
		tests.push(randomValue())
	}
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