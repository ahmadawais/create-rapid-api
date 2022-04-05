const process = require('process');
const keytar = require('keytar');

const ask = require('./ask');

module.exports = async key => {
	// Store the API key safely.
	// On macOS saved in the Keychain.
	// on Linux saved in the Secret Service API/libsecret.
	// on Windows saved in the Credential Vault.
	const existingAPIKey = await keytar.findPassword(`X-RapidAPI-Key`);

	let apiKeyToReturn = existingAPIKey;

	// If the user has not set an API key yet, or wants to reset it.
	if (!existingAPIKey || key) {
		const newRapidAPIKey = await ask({
			name: `key`,
			message: `API Key?`,
			hint: `Go to rapidapi.com/developer/ find the API key on the Security page of an app.`
		});

		await keytar.setPassword(
			`X-RapidAPI-Key`,
			`X-RapidAPI-Key`,
			newRapidAPIKey
		);

		// Set the new API key as we could have just changed it.
		apiKeyToReturn = newRapidAPIKey;
	}

	return apiKeyToReturn;
};
