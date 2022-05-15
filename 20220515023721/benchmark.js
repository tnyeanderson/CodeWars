function expandedFormWithMath(num) {
  magnitude = String(num).length - 1
  current = Math.round(num / Math.pow(10, magnitude)) * Math.pow(10, magnitude)
  return (current < 10) ? `${current}` : `${current} + ${expandedFormWithMath(num - current)}`
}

next = str => expandedFormWithStrings(str.slice(1))
function expandedFormWithStrings(num) {
	str = String(num)
	current = str[0].padEnd(str.length, '0')
  return (!Number(current)) ? `${next(str)}` : (str.length < 2) ? `${current}` : `${current} + ${next(str)}`
}

function expandedFormCleverly(num) {
	return [...String(num)]
		.map((v, i, a) => Number(v) * Math.pow(10, (a.length - i - 1)))
		.filter(v => v)
		.join(' + ') 
}

function expandedFormCleverlyWithSplit(num) {
	return String(num)
		.split('')
		.map((v, i, a) => Number(v) * Math.pow(10, (a.length - i - 1)))
		.filter(v => v)
		.join(' + ') 
}

function expandedFormCleverlyWithPad(num) {
	return [...String(num)]
		.map((v, i, a) => v.padEnd(a.length - i))
		.filter(v => v)
		.join(' + ') 
}

function expandedFormReplaceString(num) {
  return (function next(num) {
    const z = Math.pow(10, String(num).length - 1)
    const n = Math.floor(num / z) * z
    return (n < 10) ? `${n}` : `${n} + ${next(num - n)}`
  })(num).replace(' + 0', '')
}

function expandedFormReplaceRegex(num) {
  return (function next(num) {
    const z = Math.pow(10, String(num).length - 1)
    const n = Math.floor(num / z) * z
    return (n < 10) ? `${n}` : `${n} + ${next(num - n)}`
  })(num).replace(/ \+ 0$/, '')
}

let toTest = [
	expandedFormWithMath,
	expandedFormWithStrings,
	expandedFormCleverly,
	expandedFormCleverlyWithSplit,
	expandedFormCleverlyWithPad,
	expandedFormReplaceString,
	expandedFormReplaceRegex,
]

const iterations = 1000000

function getTestData() {
	return [
		12,
		42,
		70304,
		09380192343128937123771317382139012381,
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