const { ApolloServer } = require('apollo-server')

let authors = [
  {
    name: 'author1'
  },
  {
    name: 'author2'
  }
]

let allposts = [
  {
    title: 'post1'
  },
  {
    title: 'post2'
  }
]

const server = new ApolloServer({
  typeDefs: `
    type Query {
      hello: String
      author: Author
    }
    type Author {
      name: String!
      posts: [Post]
    }
    type Post {
      title: String!
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'world',
      author: () => { 
        return {
          name: "vadim"
        } 
      }
    },
    Author: {
      posts: () => {
        console.log(allposts);
        return [{
          title: "123"
        }]
      }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server running on ${url}`);
})