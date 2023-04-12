const { AutoComplete } = require('enquirer');
const examples = require('../examples/data.json');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const shouldCancel = require('cli-should-cancel');

module.exports = async () => {
	const [err, response] = await to(
		new AutoComplete({
			name: `example`,
			message: `Search for Rapid API Example`,
			limit: 10,
			initial: 2,
			choices: examples
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);
	handleError(`INPUT`, err);

	return response;
};
