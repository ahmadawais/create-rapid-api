const os = require('os');
const fs = require('fs');
const path = require('path');
const { Input } = require('enquirer');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const shouldCancel = require('cli-should-cancel');
const { Store } = require('data-store');

module.exports = async ({ name, message, hint, initial }) => {
	let history = false;

	const dontSaveHistory = [`name`, `title`, `description`, `version`];
	const saveHistory = [`category`];
	if (!initial && saveHistory.includes(name)) {
		history = {
			autosave: true,
			store: new Store({
				path: path.join(
					os.homedir(),
					`.history/create-rapid-api/${name}.json`
				)
			})
		};
	}
	const [err, response] = await to(
		new Input({
			name,
			message,
			hint,
			initial,
			history,
			validate(value, state) {
				if (state && state.name === `command`) return true;
				if (state && state.name === `name`) {
					const regex = /\s/;
					if (regex.test(value))
						return 'Project name cannot have spaces.';
					if (fs.existsSync(value)) {
						return `Directory already exists: ./${value}`;
					} else {
						return true;
					}
				}
				if (state && state.name === `key`) {
					const regex = /\s/;
					if (regex.test(value)) return `API key cannot have spaces.`;
					return true;
				}
				return !value ? `Please add a value.` : true;
			}
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);
	handleError(`INPUT`, err);

	return response;
};
