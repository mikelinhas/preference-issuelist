const resolvers = {

  Query: {
    film: async (_source, { id }, { dataSources }) => {
      return dataSources.filmsAPI.getFilm(id);
    },
    characterwithfilms: async (_source, { id }, { dataSources }) => {
      return dataSources.charactersAPI.getCharacterWithFilms(id);
    },
    character: async (_source, { id }, { dataSources }) => {
      return dataSources.charactersAPI.getCharacter(id);
    },
	  characters: async (_source, { page }, { dataSources }) => {
      const {characters, hasMore} = await dataSources.charactersAPI.getAllCharacters(page);
      return {
        characters,
        page: page,
        hasMore: hasMore
      };
    },
  }
};

module.exports = {
    resolvers: resolvers
};