function ipsBetweenMyVersion(start, end) {
	const s = start.split('.')
	return end.split('.').reduce((a, b, i) => a + ((b - s[i]) * Math.pow(256, 3 - i)), 0)
}

function ipsBetweenConvertToNum(start, end) {
	const toNum = ip => ip.split('.').reduce((acc, e) => acc * 256 + parseInt(e));
	return toNum(end) - toNum(start);
}

let toTest = [
	ipsBetweenMyVersion,
	ipsBetweenConvertToNum,
]

const iterations = 1000000

function getTestData() {
	return [
		["150.0.0.0", "150.0.0.1"],
		["10.0.0.0", "10.0.0.50"],
		["20.0.0.10", "20.0.1.0"],
		["10.11.12.13", "10.11.13.0"],
		["160.0.0.0", "160.0.1.0"],
		["170.0.0.0", "170.1.0.0"],
		["50.0.0.0", "50.1.1.1"],
		["180.0.0.0", "181.0.0.0"],
		["1.2.3.4", "5.6.7.8"],
		["0.0.0.0", "255.255.255.255"],
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
			test(d[0], d[1])
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