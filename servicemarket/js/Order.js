class Order {
  constructor(id, completedSteps) {
    this.id = id;

    this.progressbar = new ProgressBar(Order.steps, 0);
  }

  addToBody() {
    document.body.appendChild(this.progressbar.element);
  }
}
Order.steps = ["Started", "Breeding", "Training", "Finish"];

class UserOrder {
  constructor(jsonObject) {
    this.username = jsonObject.username;
    this.pokemonName = jsonObject.pokemon_name;
    this.gender = jsonObject.gender;
    this.move1 = jsonObject.move1;
    this.move2 = jsonObject.move2;
    this.move3 = jsonObject.move3;
    this.move4 = jsonObject.move4;
    this.ability = jsonObject.ability;
    this.paymentMax = jsonObject.payment_max;
    this.createdAt = jsonObject.created_at;
  }

  createUIElement() {
    // TODO: implement function that returns ui element
  }
}

class OrderData {
  constructor(pokemonName, gender, move1, move2, move3, move4, ability) {
    this.pokemonName = pokemonName;
    this.gender = gender;
    this.move1 = move1;
    this.move2 = move2;
    this.move3 = move3;
    this.move4 = move4;
    this.ability = ability;
  }

  serialize() {
    return JSON.stringify({
      pokemon_name: this.pokemonName,
      gender: this.gender,
      move1: this.move1,
      move2: this.move2,
      move3: this.move3,
      move4: this.move4,
      ability: this.ability
    });
  }
}
