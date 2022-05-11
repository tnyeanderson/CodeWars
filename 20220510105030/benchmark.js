function percentDiff(a, b) {
	const percent = (a < b) ? (b-a)/a : (a-b)/b
	return percent * 100
}

function usingAssignment(words) {
	const out = []
	words.split(' ').forEach(word => {
		if (word) {
			const num = word.match(/\d/)[0] - 1
			out[num] = word
		}
	})
	return out.join(' ')
}

function usingSort(words) {
	words.split(' ').sort((a, b) => {
		return a.match(/\d/) - b.match(/\d/)
	}).join(' ')
}

const tests = [
	"is2 Thi1s T4est 3a",
	"4of Fo1r pe6ople g3ood th5e the2",
	"thi9s i8s th7e wo6rst possibl5e scenari4o ni3ne wo2rds rever1sed"
]

const iterations = 10000

let startTime, stopTime

// Measure using assignment
startTime = Date.now()
for (let i=0; i<iterations; i++) {
	tests.forEach(test => {
		usingAssignment(test)
	})
}
stopTime = Date.now()
let usingAssignmentTime = stopTime - startTime

// Measure using sort
startTime = Date.now()
for (let i=0; i<iterations; i++) {
	tests.forEach(test => {
		usingSort(test)
	})
}
stopTime = Date.now()
let usingSortTime = stopTime - startTime

const winner = (usingAssignmentTime < usingSortTime) ? 'assigning' : 'sorting'

document.getElementById('results').innerHTML = `<div>Using assignment: ${usingAssignmentTime}</div>`
document.getElementById('results').innerHTML += `<div>Using sort: ${usingSortTime}</div>`
document.getElementById('results').innerHTML += `<div>Winner: ${winner}</div>`
document.getElementById('results').innerHTML += `<div>Percent difference: ${percentDiff(usingAssignmentTime, usingSortTime)}%</div>`