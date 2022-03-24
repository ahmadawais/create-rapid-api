const ask = require('./ask');

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
	const category = await ask({
		name: `category`,
		message: `API Category?`,
		initial: `Other`
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
