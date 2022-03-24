const ask = require('./ask');
const keytar = require('keytar');

module.exports = async () => {
	// Store the API key safely.
	// On macOS saved in the Keychain.
	// on Linux saved in the Secret Service API/libsecret.
	// on Windows saved in the Credential Vault.
	let key;
	const apiKey = await keytar.findPassword(`X-RapidAPI-Key`);

	if (!apiKey) {
		key = await ask({
			name: `key`,
			message: `API Key?`,
			hint: `Go to rapidapi.com/developer/ find the API key on the Security page of an app.`
		});

		keytar.setPassword(`X-RapidAPI-Key`, `X-RapidAPI-Key`, key);
	}

	return key;
};
