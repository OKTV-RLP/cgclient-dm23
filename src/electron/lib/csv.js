const { app } = require('electron');
const path = require('path');
const fs = require('fs');
// const settings = require('./settings');
const { parse } = require('csv-parse');
const log = require('electron-log');

const csvPath = path.join(app.getPath('userData'), 'jumpers.csv');

const getCSV = () => {
	return new Promise((resolve, reject) => {
		const parser = parse({ delimiter: ';', columns: true, encoding: 'utf8', trim: true });
		const result = [];
		log.info(`Parsing CSV on Path ${csvPath}`);
		fs.createReadStream(csvPath)
			.pipe(parser)
			.on('data', (row) => result.push(row))
			.on('error', (error) => {
				log.error('Error parsing CSV', error);
				reject(error);
			})
			.on('end', () => {
				log.info(`CSV parse done.`);
				resolve(result);
			});
	});
};

module.exports.getCSV = getCSV;

// module.exports.getCSV = () => {
// 	fs.createReadStream(csvPath)
// 		.pipe(parse({ delimiter: ';', columns: true, encoding: 'latin1' }))
// 		.on('data', (row) => {
// 			console.log(row);
// 		});
// };
