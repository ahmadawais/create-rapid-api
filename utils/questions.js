const { Select } = require('enquirer');
const ask = require('./ask');
const select = require('./select');
const auth = require('./auth');

module.exports = async ({ template, key }) => {
	if (template) {
		const type = await select({
			name: `type`,
			message: `Type`,
			hint: `e.g. rest`,
			initial: `rest`,
			choices: [`REST`, `GraphQl`, `Rapid API + Next.js + OpenAI`]
		});

		if (type === `Rapid API + Next.js + OpenAI`) {
			const apiKeysToReturn = await auth(key, true);
			const name = await ask({
				name: `name`,
				message: `Project name?`,
				hint: `(kebab-case only)`
			});

			const vars = {
				name,
				type,
				apiKeysToReturn
			};

			return vars;
		} else {
			const name = await ask({
				name: `name`,
				message: `API name?`,
				hint: `(kebab-case only)`
			});

			const title = await ask({
				name: `title`,
				message: `API Title?`
			});

			const description = await ask({
				name: `description`,
				message: `API description?`
			});
			const version = await ask({
				name: `version`,
				message: `API version?`,
				initial: `1.0`
			});
			const vars = {
				name,
				description,
				version,
				title,
				type
			};

			return vars;
		}
	}

	// const category = await ask({
	// 	name: `category`,
	// 	message: `API Category?`,
	// 	initial: `Other`
	// });

	const category = await select({
		name: `category`,
		message: `API Category?`,
		initial: `Other`,
		limit: 10,
		initial: 0,
		choices: [
			'Other',
			'Medical',
			'Database',
			'Storage',
			'Food',
			'SMS',
			'Finance',
			'Science',
			'Location',
			'Sports',
			'Entertainment',
			'Data',
			'Tools',
			'Business',
			'Travel',
			'Music',
			'Financial',
			'Logistics',
			'Payments',
			'Health and Fitness',
			'Education',
			'Advertising',
			'Transportation',
			'eCommerce',
			'News, Media',
			'Email',
			'Events',
			'Visual Recognition',
			'Movies',
			'Business Software',
			'Communication',
			'Video, Images',
			'Energy',
			'Social',
			'Devices',
			'Translation',
			'Gaming',
			'Text Analysis',
			'Media',
			'Mapping',
			'Weather',
			'Monitoring',
			'Machine Learning',
			'Commerce',
			'Reward',
			'Search'
		]
	});

	const vars = {
		name,
		title,
		category,
		description,
		version
	};

	return vars;
};
