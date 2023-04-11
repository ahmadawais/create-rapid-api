const { command } = require('execa');
const path = require('path');
const alert = require('cli-alerts');
const handleErr = require('cli-handle-error');
const { green: g, cyan: c, yellow: y, dim: d, red: r } = require('chalk');
const ora = require('ora');

const spinner = ora({ text: '' });

module.exports = async (__dirname, example) => {
	const examplePath = path.join(__dirname, example);

	try {
		console.log();
		spinner.start(
			`${y(`CREATING`)} ${example} example...\n\n${d(
				`This may take a while...`
			)}`
		);

		await command(
			`npx degit RapidAPI/DevRel-Examples-External/${example} ${examplePath}`
		);

		spinner.succeed(`${g(`${example}`)} example created!`);

		spinner.start(
			`${y(`DEPENDENCIES`)} installing...\n\n${d(
				`This may take a while...`
			)}`
		);
		process.chdir(examplePath);
		await command(`npm install`);
		spinner.succeed(`${g(`DEPENDENCIES`)} installed!`);

		alert({
			type: 'success',
			name: `Rapid API Example`,
			msg: `created successfully.`
		});

		console.log(`${d(`I suggest that you begin by typing:`)}`);
		console.log();
		console.log(`${c(`cd`)} ${example}`);
		console.log(`${c(`npm run dev`)}`);
		console.log();
	} catch (err) {
		spinner.fail(`${r(`Error`)}: something went wrong.`);
		handleErr(err);
	}
};
