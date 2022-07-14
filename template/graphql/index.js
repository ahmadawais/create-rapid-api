/**
 *
 * {{title}}
 * {{description}}
 */

const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const app = express();
const schema = require('./schema/schema');

app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true
	})
);

// port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
