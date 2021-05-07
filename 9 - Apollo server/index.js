const {
  graphql,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')

const PostType = new GraphQLObjectType({
  'name': 'Post',
  description: "This is a post",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLString }
  })
})

const query = new GraphQLObjectType({
  name: "OurAppRootSchema",
  description: "...",
  fields: () => {
    return {
      posts: {
        type: new GraphQLList(PostType),
        description: "Posts list",
        resolve: function () {
          return [
            {
              id: '123',
              title: '123',
              body: '123'
            }
          ]
        }
      }
    }
  }
})

const schema = new GraphQLSchema( { query } )

graphql(schema, '{posts { id, title, body } }').then(resp => { console.log(JSON.stringify(resp));})