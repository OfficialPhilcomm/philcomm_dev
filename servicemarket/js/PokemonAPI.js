const POKE_API_BASE_URL = "https://pokeapi.co/api/v2/";

class PokemonAPI {
  static requestPokemonNames() {
    const url = "pokemon?limit=151";

    var request = new XMLHttpRequest();
    request.open('GET', POKE_API_BASE_URL + url, false);
    request.send(null);

    if (request.status === 200) {
      let apiResponse = JSON.parse(request.responseText);

      let pokemonList = [];

      for(let pokemon of apiResponse.results) {
        pokemonList.push(Pokemon.fromIndexJSON(pokemon));
      }
      return pokemonList;
    }
  }

  static requestPokemonData(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);

    if (request.status === 200) {
      let apiResponse = JSON.parse(request.responseText);

      return apiResponse;
    }
  }
}

class Pokemon {
  static fromIndexJSON(jsonObject) {
    let pokemon = new Pokemon();
    pokemon.name = jsonObject.name;
    pokemon.url = jsonObject.url;
    pokemon.loaded = false;
    return pokemon;
  }

  fillData(jsonObject) {
    if(!this.loaded) {
      this.moves = [];
      for(let move of jsonObject.moves) {
        this.moves.push(new Move(move.move));
      }

      this.abilities = [];
      for(let ability of jsonObject.abilities) {
        this.abilities.push(new Ability(ability.ability));
      }

      this.loaded = true;
    }
  }
}

class Move {
  constructor(jsonObject) {
    this.name = jsonObject.name;
  }
}

class Ability {
  constructor(jsonObject) {
    this.name = jsonObject.name;
  }
}
