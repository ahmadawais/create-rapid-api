const getAPIKey = require('./auth');
const { GraphQLClient, gql } = require('graphql-request');

const client = async (query, variables = {}) => {
	const rapidAPIKey = await getAPIKey();

	const endpoint = 'https://platformapi-v2-graphql.p.rapidapi.com/';
	const headers = { 'X-RapidAPI-Key': rapidAPIKey };

	const graphql = new GraphQLClient(endpoint, { headers });

	const data = await graphql.request(query, variables);

	return data;
};

module.exports = {
	client,
	gql
};
