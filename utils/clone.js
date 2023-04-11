const fs = require('fs');
const fsPromises = require('fs').promises;
const axios = require('axios');
const listContent = require('list-github-dir-content');
const path = require('path');
const handleErr = require('cli-handle-error');

module.exports = async (__dirname, example) => {
	const examplePath = path.join(__dirname, example);

	try {
		const filesArray = await listContent.viaTreesApi({
			user: 'rapidapi',
			repository: 'DevRel-Examples-External',
			directory: example
		});

		// removed truncate: false
		filesArray.pop();

		const updateFilesArray = [];

		filesArray.forEach(file => {
			if (
				!file.includes('.png') &&
				!file.includes('.ico') &&
				!file.includes('.jpeg') &&
				!file.includes('.jpg')
			) {
				const newArr = file.split('/');
				newArr.shift();
				updateFilesArray.push(newArr.join('/'));
			}
		});

		const fileEndpoints = updateFilesArray.map(
			file =>
				`https://raw.githubusercontent.com/RapidAPI/DevRel-Examples-External/main/${example}/${file}`
		);
		const requests = fileEndpoints.map(endpoint => axios.get(endpoint));

		const response = await axios.all(requests);

		if (!fs.existsSync(example)) {
			await fsPromises.mkdir(example);
		}

		response.forEach(async res => {
			const requestPath = res.request.path.split('/');
			requestPath.splice(0, 5);

			if (requestPath.length === 1) {
				// if there is no nested directories
				const dirPath = path.join(examplePath, requestPath[0]);

				let data = res.data;
				if (dirPath.includes('.json')) {
					data = JSON.stringify(res.data, null, 2);
				}
				await fsPromises.writeFile(dirPath, data, err => {
					if (err) throw err;
				});
			} else if (requestPath.length === 2) {
				// if there is only one subdirectory
				const dirPath = path.join(examplePath, requestPath[0]);

				// check if the directory already exists
				if (!fs.existsSync(dirPath)) {
					await fsPromises.mkdir(dirPath);
				}
				// write response to the file
				await fsPromises.writeFile(
					path.join(dirPath, requestPath[1]),
					res.data,
					err => {
						if (err) throw err;
					}
				);
			} else {
				// if there are 2 level of nesting
				const dirPath = path.join(
					examplePath,
					requestPath[0],
					requestPath[1]
				);

				// check if the directory already exists
				if (!fs.existsSync(dirPath)) {
					await fsPromises.mkdir(dirPath);
				}

				await fsPromises.writeFile(
					path.join(dirPath, requestPath[2]),
					res.data,
					err => {
						if (err) throw err;
					}
				);
			}
		});
	} catch (err) {
		spinner.fail(`${r(`ERROR`)} something went wrong.`);
		handleErr(err);
	}
};
