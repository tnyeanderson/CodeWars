function percentDiff(a, b) {
	const percent = (a < b) ? (b - a) / a : (a - b) / b
	return percent * 100
}

const f1Name = 'isInteger'
function f1(sq) {
	// Return the next square if sq is a perfect square, -1 otherwise
	const s = Math.sqrt(sq)
	return Number.isInteger(s) ? Math.pow(s + 1, 2) : -1
}

const f2Name = 'modulus'
function f2(sq) {
	// Return the next square if sq is a perfect square, -1 otherwise
	const s = Math.sqrt(sq)
	return s % 1 === 0 ? Math.pow(s + 1, 2) : -1
}

const tests = [
	[121, 144],
	[625, 676],
	[319225, 320356],
	[15241383936, 15241630849],
	[155, -1],
	[342786627, -1]
]

const iterations = 100000000

function runBenchmark() {
	let startTime, stopTime

	// Measure using is integer
	startTime = Date.now()
	for (let i = 0; i < iterations; i++) {
		tests.forEach(test => {
			f1(test[0])
		})
	}
	stopTime = Date.now()
	let f1Time = stopTime - startTime

	// Measure using modulus
	startTime = Date.now()
	for (let i = 0; i < iterations; i++) {
		tests.forEach(test => {
			f2(test[0])
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