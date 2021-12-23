const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.
  
  type Book {
    title: String
    author: String
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    books: [Book]
  }

  type Mutation {
    createBook(title: String, author: String, description: String): Book
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    description: 'testing shit'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    description: 'Shit is getting real'
  },
  {
    title: 'test book',
    author: 'Moses west',
    description: 'This is a demo graphQL project'
  }
];

function save ({title, author, description}) {
  let item = {title, author, description}
  books.unshift(item)
  return item
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },

  Mutation: {
    async createBook (_, {title, author, description}) {
      return await save({title, author, description})
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});