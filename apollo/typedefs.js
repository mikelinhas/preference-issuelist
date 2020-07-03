const { gql } = require('apollo-server');

const typeDefs = gql`
  type Character {
    id: Int!
    name: String
    hair_color: String
    skin_color: String
    eye_color: String
    gender: String
    films: [Film]
  }

  type Film {
    id: Int!
    title: String
    url: String
  }

  type CharacterWithFilms {
    name: String
    hair_color: String
    skin_color: String
    eye_color: String
    gender: String
    films: [Film]
  }

  type CharacterConnection {
    page: Int!
    hasMore: Boolean!
    characters: [Character]
  }

  type Query {
    film(id: Int): Film
    character(id: Int): Character
    characterwithfilms(id: Int): CharacterWithFilms
    characters(page: Int): CharacterConnection!
  }
`;

module.exports = {
    typeDefs: typeDefs,
};