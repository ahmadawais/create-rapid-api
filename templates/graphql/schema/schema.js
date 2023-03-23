const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList
} = graphql;

const names = ['John', 'Paul', 'George', 'Ringo'];
const age = [25, 30, 35, 40];

const query = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		name: {
			type: GraphQLList(GraphQLString),
			resolve() {
				return names;
			}
		},
		age: {
			type: GraphQLList(GraphQLInt),
			resolve() {
				return age;
			}
		}
	}
});

module.exports = new GraphQLSchema({ query });
