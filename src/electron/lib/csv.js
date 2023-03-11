const { app } = require('electron');
const path = require('path');
const fs = require('fs');
// const settings = require('./settings');
const { parse } = require('csv-parse');

const csvPath = path.join(app.getPath('userData'), 'jumpers.csv');

const getCSV = new Promise((resolve, reject) => {
	const parser = parse({ delimiter: ';', columns: true, encoding: 'utf16le' });
	let result = [];
	fs.createReadStream(csvPath)
		.pipe(parser)
		.on('data', (row) => result.push(row))
		.on('end', () => {
			resolve(result);
		})
		.on('error', (error) => {
			console.error(error);
			reject(error);
		});
});

module.exports.getCSV = getCSV;

// module.exports.getCSV = () => {
// 	fs.createReadStream(csvPath)
// 		.pipe(parse({ delimiter: ';', columns: true, encoding: 'latin1' }))
// 		.on('data', (row) => {
// 			console.log(row);
// 		});
// };
