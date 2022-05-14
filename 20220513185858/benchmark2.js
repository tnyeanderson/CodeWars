function sumChars(word) {
	let sum = 0
	for (let letter of word) {
		sum += letter.charCodeAt(0) - 96
	}
	return sum
}

function myAnswer(x) {
	let answer = {sum: 0}
	x.split(' ').forEach(word => {
		let sum = sumChars(word)
		answer = (sum > answer.sum) ? {word, sum} : answer
	})
	return answer.word
}

function cleverAnswer(s){
  let as = s.split(' ').map(s=>[...s].reduce((a,b)=>a+b.charCodeAt(0)-96,0));
  return s.split(' ')[as.indexOf(Math.max(...as))];
}

function highWithReduce(x) {
	x.split(' ').reduce((answer, word) => {
		let sum = word.split('').reduce((a, b) => a + b.charCodeAt(0) - 96, 0)
		return (sum > answer.sum) ? {word, sum} : answer
	}, {sum: 0}).word
}

let toTest = [
	myAnswer,
	cleverAnswer,
	highWithReduce,
]

const iterations = 1000000

let testData = [
	'man i need a taxi up to ubud',
	'what time are we climbing up the volcano',
	'take me to semynak',
	'aa b',
	'b aa',
	'bb d',
	'd bb',
	'aaa b',
]

function setupTestData() {
	$results.innerHTML += `<div>Generating test data...</div>`
	// let count = 100
	// while (count--) {
	// 	testData.push(randomValue())
	// }
	console.log('Test data', testData)
}

///////////////////////
// START BOILERPLATE //
///////////////////////

const $results = document.getElementById('results')

function percentDiff(a, b) {
	return (a && b) ? Math.round(100 * (b - a) / a) : 0
}

function percentDiffOfResults(results, i) {
	return percentDiff(results[0].time, results[i].time)
}

function rowsToColumns(rows) {
	const colCount = rows[0].length
	const columns = Array.from(rows[0], x => [])
	rows.forEach(v => {
		for (let c=0; c<colCount; c++) {
			columns[c].push(v[c])
		}
	})
	return columns
}

function getColumnMaxSizes(rows) {
	const columns = rowsToColumns(rows)
	return columns.map(col => {
		let max = 0
		col.forEach(v => max = (v.length > max) ? v.length : max)
		return max
	})
}

function formatRow(row, sizes, padding) {
		rowText = ``
		row.forEach((v, i) => {
			rowText += String(v).padEnd(sizes[i] + padding)
		})
		return rowText
}

function generateRows(results) {
	const header = ['Name', 'Time', 'Percent diff']
	const rows = results.map((v, i) => [v.name, v.time, percentDiffOfResults(results, i) + '%'])
	return [header, ...rows]
}

function printResultsTable(results) {
	const padding = 3
	const rows = generateRows(results)
	const sizes = getColumnMaxSizes(rows)
	const width = sizes.reduce((a, b) => a + b) + (sizes.length * padding)
	$results.innerHTML += `<div>Results:</div>`
	$results.innerHTML += `<pre id="results-table"></pre>`
	$resultsTable = document.getElementById('results-table')
	rows.forEach((row, i) => {
		const rowText = formatRow(row, sizes, padding)
		if (i === 0) {
			$resultsTable.innerHTML += `<div class="results-table-header">${rowText}</div>`
			$resultsTable.innerHTML += '-'.repeat(width)
		} else {
			$resultsTable.innerHTML += `<div>${rowText}</div>`
		}
	})
}

function randomValue() {
	return Math.round(Math.random() * 1000)
}

function runTestTimes(test, iterations) {
	let startTime = Date.now()
	for (let i = 0; i < iterations; i++) {
		testData.forEach(d => {
			test(d)
		})
	}
	return Date.now() - startTime
}

function compareAllTests() {
	return toTest
		.map(testFunc => {
			return {
				name: testFunc.name,
				time: runTestTimes(testFunc, iterations)
			}
		})
		.sort((a, b) => a.time - b.time)
}

function runBenchmark() {
	$results.innerHTML = ''

	setupTestData()

	$results.innerHTML += `<div>Running tests...</div>`

	let results = compareAllTests()

	printResultsTable(results)
	$results.innerHTML += `<h2>Winner: ${results[0].name}</h2>`
}