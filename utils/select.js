const os = require('os');
const fs = require('fs');
const path = require('path');
const { AutoComplete } = require('enquirer');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const shouldCancel = require('cli-should-cancel');
const { green: g, red: r, yellow: y, dim: d } = require('chalk');
module.exports = async ({ name, message, choices, hint, initial, limit }) => {
	const [err, response] = await to(
		new AutoComplete({
			name,
			message,
			choices,
			hint,
			initial,
			limit,
			footer() {
				return d('(Scroll up and down or type to reveal more choices)');
			}
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);
	handleError(`SELECT`, err);

	return response;
};
