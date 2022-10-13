const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const AllowedUsers = new GraphQLObjectType({
    name: 'AllowedUsers',
    description: 'This represents all allowed users for document',
    fields: () => ({
        id: { type: GraphQLString }
    })
})

const CommentsAll = new GraphQLObjectType({
    name: 'CommentsAll',
    description: 'This represents all documents comments',
    fields: () => ({
        line: { type: GraphQLString },
        comment: { type: GraphQLString },
        content: { type: GraphQLString }
    })
})

const DocumentType = new GraphQLObjectType({
    name: 'documents',
    description: 'This represents a document with content',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLString },
        allowed_users: {
            type: new GraphQLList(AllowedUsers),
        },
        comments: {
            type: new GraphQLList(CommentsAll),
        }
    })
})

module.exports = DocumentType;