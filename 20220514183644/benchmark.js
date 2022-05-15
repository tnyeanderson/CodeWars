function findMissingLetterWithWhile(arr) {
	let answer = arr.pop().charCodeAt(0)
	while (arr.length) {
		if (--answer > arr.pop().charCodeAt(0)) {
			return String.fromCharCode(answer)
		}
	}
}

function findMissingLetterWithForIndex(arr) {
	let answer = arr[0].charCodeAt(0)
	for (let i = 1; i < arr.length; i++) {
		if (++answer < arr[i].charCodeAt(0)) {
			return String.fromCharCode(answer)
		}
	}
}

function findMissingLetterWithFind(array) {
	let i = array[0].charCodeAt();
	return String.fromCharCode(array.find(el => el.charCodeAt() != i++).charCodeAt() - 1);
}

let toTest = [
	findMissingLetterWithForIndex,
	findMissingLetterWithWhile,
	findMissingLetterWithFind,
]

const iterations = 10000000

function getTestData() {
	return [
		['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i'],
		['M', 'N', 'O', 'Q', 'R', 'S'],
	]
}

let testData

function setupTestData() {
	$results.innerHTML += `<div>Generating test data...</div>`
	// let count = 100
	// while (count--) {
	// 	testData.push(randomValue())
	// }
	testData = getTestData()
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
		for (let c = 0; c < colCount; c++) {
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
		getTestData().forEach(d => {
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