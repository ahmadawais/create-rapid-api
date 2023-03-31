const ora = require('ora');
const alert = require('cli-alerts');
const { command } = require('execa');
const { green: g, cyan: c, yellow: y, dim: d } = require('chalk');
const handleErr = require('cli-handle-error');
const copy = require('copy-template-dir');
const path = require('path');
const fs = require('fs/promises');

const spinner = ora({ text: '' });

module.exports = (dirName, vars) => {
	const outDir = vars.name;
	const type = vars.type;
	const outDirPath = path.join(process.cwd(), outDir);

	if (type === `REST`) {
		const inDir = path.join(dirName, `templates/${type.toLowerCase()}`);
		copy(inDir, outDirPath, vars, async (err, files) => {
			if (err) handleErr(err);

			console.log();
			console.log(
				`${d(`Creating files in ${g(`./${outDir}`)} directory:`)}`
			);
			console.log();

			files.forEach(file => {
				const fileName = path.basename(file);
				console.log(`${g(`CREATED`)} ${fileName}`);
			});
			console.log();

			spinner.start(
				`${y(`DEPENDENCIES`)} installing…\n\n${d(
					`This may take a while...`
				)}`
			);
			process.chdir(outDirPath);
			await command(`npm install express`);
			await command(`npm install -D nodemon`);
			await command(`npm dedupe`);
			spinner.succeed(`${g(`DEPENDENCIES`)} installed!`);

			alert({
				type: 'success',
				name: 'API created',
				msg: `\n\n${files.length} files created in ./${outDir} directory.`
			});

			console.log(`${d(`I suggest that you begin by typing:`)}`);
			console.log();
			console.log(`${c(`cd`)} ${outDir}`);
			console.log(`${c(`npm run server`)}`);
			console.log();
		});
	}

	if (type === `GraphQL`) {
		const inDir = path.join(dirName, `templates/${type.toLowerCase()}`);
		copy(inDir, outDirPath, vars, async (err, files) => {
			if (err) handleErr(err);

			console.log();
			console.log(
				`${d(`Creating files in ${g(`./${outDir}`)} directory:`)}`
			);
			console.log();

			files.forEach(file => {
				const fileName = path.basename(file);
				console.log(`${g(`CREATED`)} ${fileName}`);
			});
			console.log();

			spinner.start(
				`${y(`DEPENDENCIES`)} installing…\n\n${d(
					`This may take a while...`
				)}`
			);
			process.chdir(outDirPath);
			await command(`npm install express express-graphql graphql`);
			await command(`npm install -D nodemon`);
			await command(`npm dedupe`);
			spinner.succeed(`${g(`DEPENDENCIES`)} installed!`);

			alert({
				type: 'success',
				name: 'API created',
				msg: `\n\n${files.length} files created in ./${outDir} directory.`
			});

			console.log(`${d(`I suggest that you begin by typing:`)}`);
			console.log();
			console.log(`${c(`cd`)} ${outDir}`);
			console.log(`${c(`npm run server`)}`);
			console.log();
		});
	}

	if (type === `Rapid API + Next.js + OpenAI`) {
		const inDir = path.join(dirName, `templates/rapid-openai`);
		copy(inDir, outDirPath, vars, async (err, files) => {
			if (err) handleErr(err);

			const env = `OPENAI_API_KEY=${vars.apiKeysToReturn.openAIKey}
RAPIDAPI_KEY=${vars.apiKeysToReturn.rapidAPIKey}
RAPIDAPI_URL=`;

			await fs.writeFile(path.join(outDirPath, `.env.local`), env);

			console.log();
			console.log(
				`${d(`Creating files in ${g(`./${outDir}`)} directory:`)}`
			);
			console.log();

			files.forEach(file => {
				const fileName = path.basename(file);
				console.log(`${g(`CREATED`)} ${fileName}`);
			});
			console.log(`${g(`CREATED`)} .env.local`);
			console.log();

			spinner.start(
				`${y(`DEPENDENCIES`)} installing…\n\n${d(
					`This may take a while...`
				)}`
			);
			process.chdir(outDirPath);
			await command(`npm install express express-graphql graphql`);
			await command(`npm install -D nodemon`);
			await command(`npm dedupe`);
			spinner.succeed(`${g(`DEPENDENCIES`)} installed!`);

			alert({
				type: 'success',
				name: 'Rapid API + Next.js + OpenAI app created',
				msg: `\n\n${files.length} files created in ./${outDir} directory.`
			});

			console.log(`${d(`I suggest that you begin by typing:`)}`);
			console.log();
			console.log(`${c(`cd`)} ${outDir}`);
			console.log(`${c(`npm run dev`)}`);
			console.log();
		});
	}
};
