#!/usr/bin/env node

/**
 * create-rapid-api
 * Rapidly create APIs to sell
 *
 * @author Ahmad Awais <https://twitter.com/MrAhmadAwais/>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, key } = flags;

const alert = require('cli-alerts');
const generate = require('./utils/generate');
const auth = require('./utils/auth');
const questions = require('./utils/questions');
const { gql, client } = require('./utils/client');

const ora = require('ora');
const spinner = ora({ text: '' });
const { green: g, red: r, yellow: y, dim: d } = require('chalk');

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	if (input.includes(`template`)) {
		const vars = await questions({ template: true, key });
		generate(__dirname, vars);
		return;
	}

	await auth(key);
	const answers = await questions();

	// Create an API.
	const query = gql`
		mutation createApi($apiCreateInput: ApiCreateInput!) {
			createApi(api: $apiCreateInput) {
				id
				slugifiedName
			}
		}
	`;

	const variables = {
		apiCreateInput: {
			name: answers.name,
			title: answers.title,
			category: answers.category,
			description: answers.description,
			version: {
				name: answers.version
			}
		}
	};

	spinner.start(`${y(`API`)} creating…`);

	const {
		createApi: { slugifiedName }
	} = await client(query, variables);
	// console.log('data: ', data);
	spinner.succeed(`${g(`API`)} created`);

	alert({
		type: `success`,
		name: `API CREATED`,
		msg: `${answers.title} has been created.\n https://rapidapi.com/provider/apis/${slugifiedName}/definition/`
	});
})();
