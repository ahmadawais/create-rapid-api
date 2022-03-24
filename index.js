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
const { clear, debug } = flags;

const auth = require('./utils/auth');
const questions = require('./utils/questions');
const alert = require('cli-alerts');
const { yellow: y } = require('chalk');
const open = require('open');

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	await auth();
	const answers = await questions();

	alert({
		type: `success`,
		name: `API CREATED`,
		msg: `${y(answers.title)} was created successfully!`
	});

	await open(
		`https://rapidapi.com/kevin-org-kevin-org-default/api/papajoke/`
	);
})();
