var submitButton = document.getElementById("submit-button");
var pokemonSelect = document.getElementById("pokemon-select");
var moveSelect1 = document.getElementById("move-select1");
var moveSelect2 = document.getElementById("move-select2");
var moveSelect3 = document.getElementById("move-select3");
var moveSelect4 = document.getElementById("move-select4");
var abilitySelect = document.getElementById("ability-select");

var pokemons = PokemonAPI.requestPokemonNames();
addPokemons();

fillPokemonData();
updateSelects();

pokemonSelect.onchange = function() {
  fillPokemonData();
  updateSelects();
}

function addPokemons() {
  for(let pokemon of pokemons) {
    let option = document.createElement('option');
    option.innerHTML = StringUtils.humanize(pokemon.name);
    option.value = pokemon.name;
    pokemonSelect.appendChild(option);
  }
}

function fillPokemonData() {
  console.log(pokemons[pokemonSelect.selectedIndex].url);
  pokemons[pokemonSelect.selectedIndex].fillData(PokemonAPI.requestPokemonData(pokemons[pokemonSelect.selectedIndex].url));
}

function updateSelects() {
  moveSelect1.innerHTML = "";
  moveSelect2.innerHTML = "";
  moveSelect3.innerHTML = "";
  moveSelect4.innerHTML = "";

  let selectedPokemon = pokemons[pokemonSelect.selectedIndex];
  for(let move of selectedPokemon.moves) {
    let option = document.createElement('option');
    option.innerHTML = StringUtils.humanize(move.name);
    option.value = move.name;
    moveSelect1.appendChild(option.cloneNode(true));
    moveSelect2.appendChild(option.cloneNode(true));
    moveSelect3.appendChild(option.cloneNode(true));
    moveSelect4.appendChild(option.cloneNode(true));
  }

  abilitySelect.innerHTML = "";
  for(let ability of selectedPokemon.abilities) {
    let option = document.createElement('option');
    option.innerHTML = StringUtils.humanize(ability.name);
    option.value = ability.name;
    abilitySelect.appendChild(option);
  }
}

submitButton.addEventListener("click", function(e) {
  let pokemonName = pokemons[pokemonSelect.selectedIndex].name;
  let gender = "none"; // TODO: link to select
  let move1 = moveSelect1[moveSelect1.selectedIndex].value;
  let move2 = moveSelect2[moveSelect2.selectedIndex].value;
  let move3 = moveSelect3[moveSelect3.selectedIndex].value;
  let move4 = moveSelect4[moveSelect4.selectedIndex].value;
  let ability = abilitySelect[abilitySelect.selectedIndex].value;

  let orderData = new OrderData(pokemonName, gender, move1, move2, move3, move4, ability);
  BackendAPI.submitOrder(orderData);
});
