const { RESTDataSource } = require('apollo-datasource-rest');

const REST_API_URL = "https://swapi.dev/api/"

class CharactersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = REST_API_URL;
  }

  async getCharacter(id) {
    return this.get(`people/${id}`);
  }

  async getCharacterWithFilms(id) {
    let character = await this.get(`people/${id}`);
    let films = await Promise.all(character.films.map(film =>{
      let url_params = film.split('/')
      let film_id = url_params[ url_params.length - 2 ]
      let film_details = this.get(`films/${film_id}`)
      return film_details
    }))

    let film_titles = films.map(film => {
      return {title: film.title}
    })
    character.films = film_titles
    return character
  }

  async getAllCharacters(page) {
    const response = await this.get('people/?page=' + page);
    let characters = response.results.map(function(character) {
      return characterReducer(character)
    }) 

    let hasMore = true

    if (!response.next) {hasMore = false}

    return {characters: characters, hasMore: hasMore}
  }
}

class FilmsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = REST_API_URL;
  }

  async getFilm(id) {
    return this.get(`films/${id}`)
  }
}


const characterReducer = function (character) {
  let url_params = character.url.split('/')
  let id = url_params[ url_params.length - 2 ]
  return {
    id: id,
    url: `${character.url}`,
    name: character.name,
    hair_color: character.hair_color,
    skin_color: character.skin_color,
    eye_color: character.eye_color,
    gender: character.gender,
    movies: character.movies
  };
}

const datasources = function() {
 return {
      charactersAPI: new CharactersAPI(),
      filmsAPI: new FilmsAPI()
  };
}

module.exports = {
    datasources: datasources
};
