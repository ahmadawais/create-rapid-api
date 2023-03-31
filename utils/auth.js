const process = require('process');
const keytar = require('keytar');

const ask = require('./ask');

module.exports = async (key, template = false) => {
	// Store the API key safely.
	// On macOS saved in the Keychain.
	// on Linux saved in the Secret Service API/libsecret.
	// on Windows saved in the Credential Vault.
	let rapidAPIKey = await keytar.findPassword(`X-RapidAPI-Key`);
	let openAIKey = await keytar.findPassword(`OpenAI-Key`);

	let apiKeysToReturn = { rapidAPIKey, openAIKey };

	// If the user has not set Rapid API key yet, or wants to reset it.
	if (!rapidAPIKey || key) {
		rapidAPIKey = await ask({
			name: `key`,
			message: `Rapid API Key?`,
			hint: `Go to https://rapidapi.com/developer/ find the API key on the Security page of an app.`
		});

		await keytar.setPassword(
			`X-RapidAPI-Key`,
			`X-RapidAPI-Key`,
			rapidAPIKey
		);

		// Set the new API key as we could have just changed it.
		apiKeyToReturn = { rapidAPIKey };
	}

	// If the user has not set OpenAI API key, or wants to reset it
	if ((!openAIKey || key) && template) {
		openAIKey = await ask({
			name: `key`,
			message: `OpenAI API Key?`,
			hint: `Go to https://platform.openai.com/account/api-keys to find the API key.`
		});

		await keytar.setPassword(`OpenAI-Key`, `OpenAI-Key`, openAIKey);

		// Set the new API key as we could have just changed it.
		apiKeysToReturn = { ...apiKeysToReturn, openAIKey };
	}

	return apiKeysToReturn;
};
