const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Food {
    food: String
    price: String
    description: String
  }

  type Query {
    foods: [Food]
  }

  type Mutation {
    createFood(food: String, price: String, description: String): Food
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const foods = [
  {
    food: 'Steak',
    price: '100$',
    description: 'Well done'
  },
  {
    food: 'Pasta',
    price: '80$',
    description: 'Spicy'
  },
  {
    food: 'French Fries',
    price: '10$',
    description: 'Waffle style'
  }
];

function save ({food, price, description}) {
  let item = {food, price, description}
  foods.unshift(item)
  return item
}

const resolvers = {
  Query: {
    foods: () => foods,
  },

  Mutation: {
    async createFood (_, {food, price, description}) {
      return await save({food, price, description})
    }
  } 
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});