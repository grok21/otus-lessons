const {
  graphql,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInt
} = require('graphql')

const { graphqlHTTP } = require('express-graphql')
const express = require('express')

let posts = [
  {
    id: '1',
    title: 'Post 1',
    body: 'First post',
    author_id: '1'
  },
  {
    id: '2',
    title: 'Post 2',
    body: 'Second post',
    author_id: '2'
  }
]

let authors = [
  {
    id: '1',
    name: 'author1'
  },
  {
    id: '2',
    name: 'author2'
  }
]

const AuthorType = new GraphQLObjectType({
  'name': 'Author',
  description: "This is a author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) }, 
    posts: {
      type: new GraphQLList(PostType),
      resolve: (author) => {
        return posts.filter(p => p.author_id === author.id)
      }
    }
  })
})

const PostType = new GraphQLObjectType({
  'name': 'Post',
  description: "This is a post",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (root) => {
        console.log(root);
        return authors.find(a => a.id === root.author_id)
      }
    }
  })
})

const query = new GraphQLObjectType({
  name: "OurAppRootSchema",
  description: "...",
  fields: () => {
    return {
      authors: {
        type: new GraphQLList(AuthorType),
        description: "Authors list",
        resolve: function () {
          return authors
        }
      },
      author: {
        type: AuthorType,
        args: { id: { type: new GraphQLNonNull(GraphQLString)}},
        resolve: function (root, args) {
          console.log(args);
          console.log(root);
          return authors.find(a => a.id === args.id)
        }
      },
      posts: {
        type: new GraphQLList(PostType),
        description: "Posts list",
        resolve: function () {
          return posts
        }
      },
      post: {
        type: PostType,
        description: "One post",
        resolve: function () {
          return posts[0]
        }
      }
    }
  }
})

const schema = new GraphQLSchema( { query } )

const app = express()
app.use('/', graphqlHTTP({
  schema, 
  graphiql: true
}))

//graphql(schema, '{posts { id, title, body } }').then(resp => { console.log(JSON.stringify(resp));})

app.listen(3000)