const { Select } = require('enquirer');
const ask = require('./ask');
const select = require('./select');

module.exports = async () => {
	const name = await ask({
		name: `name`,
		message: `API name?`,
		hint: `(kebab-case only)`
	});
	const title = await ask({
		name: `title`,
		message: `API Title?`
	});
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

	const description = await ask({
		name: `description`,
		message: `CLI description?`
	});
	const version = await ask({
		name: `version`,
		message: `API version?`,
		initial: `1.0`
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
