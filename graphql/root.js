const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const DocType = require("./documents.js");

const documents = require("../models/docsModel.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        document: {
            type: DocType,
            description: 'A single document',
            args: {
                id: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                const document = await documents.getOneDocs(args.id);
                return document[0];
            }
        },
        documents: {
            type: new GraphQLList(DocType),
            description: 'List of all documents',
            resolve: async function() {
                const alldocuments = await documents.getAllDocs();
                console.log(alldocuments)
                return alldocuments;
            }
        }
    })
});

module.exports = RootQueryType;