class RandomRegionGenerator {
  constructor(textarea_id, generate_button_id, text_output_id, button_div_id) {
    this.strings = {
      nesw: ["North", "East", "South", "West"],
      place: ["Free","Desert","Forest","Berry","Eagle","Claw","Tooth","Bear","Monkey","King",
        "Queen","Rock","Mountain","Peak","Finger","Lightning","Storm","Battle","Death","Doom",
        "Grave","Evil","Good","Angel","Peace","Pirate","Fool","Spear","Goblin","Orc","Elf",
        "Dwarf","Gnome","Demon","Wizard","Pointe","Glen","Cove","Axe","Passage","Giant","Midnight",
        "Ice","Fire","Water","Wind","Monster","Magic","Falcon","Tiger","Vile","Shrine","Cold",
        "Tree","Silent","Mist","Old","End","Corn","Trek","Crab","Bane","Vale","Lost","Sword","Fist",
        "Grove","Town","Scar","Silver","Gold","Copper","Granite","Black","Red","Green","Blue","Orange",
        "Yellow","White","Sage","Guard","Temple","Dragon","Devil","Pass","High","Low","Ruby","Emerald",
        "Diamond","Topaz","Sapphire","Rat","Foot","Dog","Ash","Leg","Arm","Hand","Bird","Dagger","Lion",
        "Purple","Opal","Den","Druid","Sorcerer","Warrior","Sword","Ridge","Flower","Moss","Shroom",
        "Herb","Rope","Sparkle","Blade","Fairy","Pearl","Light","Dark","Black","Summer","Snow",
        "Winter","Tiger","Witch","Spell","Song","Blossom","Ghost","Spirit","Throne","Bat","Fowl",
        "Dream","Forgotten","Leaf","Root","Fey","Noble","Beard","Scribe","Guild","Feather","Master",
        "Thorn","Crow","Eagle","Worm","Snake","Serpent","Skull","Water","Crystal",
      ],
      terrain: [
        "Mountains","Cliffs","Peak","Rock","Valley","Hills","Forest","Jungle","Woods","Lake",
        "Sea","River","Stream","Falls (Waterfalls)","Marsh","Swamp","Desert","Plains",
        "Brush (Scrubland)","Caves","Delta","Creek","Caverns",
      ],
      island: [
        "Island","Island","Island","Island","Island","Cove","Bay","Landing","Isle","Rock",
      ],
      amount: [
        "Rarely","Somewhat","Unpredictably","Comically","Very","Weirldly",
        "Extremely","Excessively","Unusually",
      ],
      quality: [
        "Peaceful","Violent","Industrious","Mercantile","Lethargic","Deceptive",
        "Spacey","Adventurous","Intelligent","Hateful","Cynical",
        "Childish","War-Torn","Spirited","Short-Tempered","Warmhearted","Jaded",
        "Spophisticated","Emotional","Stoic","Wise","Playful","Compassionate",
        "Mischevious","Mysterious","Confrontational","Sentimental","Suspicious",
        "Irritable","Jovial","Joyous","Foolish","Cold","Friendly",
      ],
      uuddlrlrba: [
        "Pacman","Samus","Donkey Kong","Defender","Space Invaders","Zelda",
        "Q*bert","Asteroids","Berzerk","Philcomm","Shams","New and Improved!",
      ],
      personality: [
        "Absent-minded","Adventurous","Apathetic","Amiable","Dramatic","Inspiring",
        "Childlike","Maternal/Paternal","Cowardly","Cool-headed","Paranoid",
        "Egotistical","Energetic","Gloomy","Hypercritical","Snobby",
        "Illogical","Jovial","Tranquil","Stoic","Confrontational","Sentimental",
        "Suspicious","Irritable","Bitter","Quirky","Impulsive","Judgemental",
        "Arrogant","Talkative",
      ],
      monster: [
        "Orcs","Lizardfolk","Lycanthrope","Dragon","Centaur","Bugbear","Vampire(s)",
        "Lich","Harpies","Devils","Demons","Giants","Goblins","Hobgoblins",
        "Ogres","Trolls","Skeletons","Djinni","Efreeti","Oni","Zombies",
        "Dire Rats","Beholder","Wraiths","Mindflayer","Owlbear","Kobolds","Gnolls",
        "Fire Elementals","Wind Elementals","Water Elementals","Earth Elementals",
        "Dinosaurs","Beasts","Bandits","Hydra",
      ],
      lycanthrope: [
        "Werebear","Wereboar","Wererat","Weretiger",
        "Werewolf","Mixed",
      ],
      dragon: [
        "Black Dragon","Blue Dragon","Green Dragon","Red Dragon",
        "White Dragon","Dracolich Dragon","Gold Dragon","Copper Dragon",
        "Silver Dragon","Bronze Dragon",
      ],
      giant: [
        "Fire Giant","Frost Giant","Hill Giant","Stone Giant","Storm Giant","Mixed Giant",
      ],
      race: [
        "Dwarf","Elf","Halfling","Human","Dragonborn",
        "Gnome","Half-Elf","Half-Orc","Tiefling","Human",
      ],
      class: [
        "Barbarian","Bard","Cleric","Druid","Fighter",
        "Monk","Paladin","Ranger","Rogue","Sorcerer",
        "Warlock","Wizard",
      ],
      norepeat: ["nesw"],
    };

    this.buffer = {};
    this.textarea_id = textarea_id;
    this.generate_button_id = generate_button_id;
    this.text_output_id = text_output_id;
    this.button_div_id = button_div_id;

    for (let category of this.getAllCategories()) {
      let button = document.createElement("button");
      button.className = "rrgbutton";
      button.setAttribute("onclick", "rrg.addText('" + category + "')");
      button.innerHTML = category;
      document.getElementById(button_div_id).appendChild(button);
    }
    let button = document.createElement("button");
    button.className = "rrgbutton";
    button.setAttribute("onclick", "rrg.setPregen()");
    button.innerHTML = "Template text";
    document.getElementById(button_div_id).appendChild(button);

    document
      .getElementById(generate_button_id)
      .setAttribute("onclick", "rrg.generate()");
  }

  getAllCategories() {
    return Object.keys(this.strings).filter(
      (e) => e !== "norepeat" && e !== "uuddlrlrba"
    );
  }

  getCustom(name) {
    let retArray = this.strings[name];
    let ret;
    if (retArray !== undefined) {
      let norepeat = false;
      if (this.strings.norepeat.indexOf(name) != -1) {
        norepeat = true;
        if (this.buffer[name] === undefined) {
          this.buffer[name] = [];
        }
        if (this.buffer[name].length == retArray.length) {
          this.buffer[name] = [];
        }
      }
      if (norepeat) {
        ret = retArray[Math.floor(Math.random() * this.strings[name].length)];
        while (this.buffer[name].indexOf(ret) != -1) {
          ret = retArray[Math.floor(Math.random() * this.strings[name].length)];
        }
        this.buffer[name].push(ret);
      } else {
        ret = retArray[Math.floor(Math.random() * this.strings[name].length)];
      }
      ret = ret.replace("(", "&#40;").replace(")", "&#41;");
    }
    return ret;
  }

  replaceText(text) {
    this.buffer = {};

    while (text.indexOf("/(") != -1) {
      text = text.replace("/(", "&#40;");
    }
    while (text.indexOf("/)") != -1) {
      text = text.replace("/)", "&#41;");
    }
    while (text.indexOf("(") > text.indexOf(")")) {
      text = text.replace(")", "&#41;");
    }

    while (text.indexOf("(") != -1 && text.indexOf(")") != -1) {
      let subtext = text.substring(text.indexOf("("), text.indexOf(")") + 1);
      let replacer = subtext.replace("(", "").replace(")", "");
      let custom;
      if (replacer != "norepeat") {
        custom = this.getCustom(replacer);
      }
      if (custom === undefined) {
        text = text.replace(
          subtext,
          "&#40;error on generate " + replacer + " string&#41;"
        );
      } else {
        text = text.replace(subtext, custom);
      }
      while (text.indexOf("(") > text.indexOf(")")) {
        text = text.replace(")", "&#41;");
      }
    }
    while (text.indexOf("\n") != -1) {
      text = text.replace("\n", "<br>");
    }
    return text;
  }

  preGenerated() {
    return (
      "The town of (place) (place) can be found by the (place) (place) (terrain). " +
      "Just (nesw) you'll find the (place) (place) (terrain) and to the (nesw) the " +
      "(place) (place) (terrain). " +
      "\n\nIt is a (amount) (quality) village, run by a (race) (class). " +
      "\n\nTheir largest problem is/are the (personality) (monster) in the (place) (place) (terrain) to the (nesw). " +
      "They are led by /(or it is working with/) a (personality) (race) (class). " +
      "\n\nThey have good relations with the (amount) (quality) (race) in the (place) (place) (terrain) to the (nesw), " +
      "who are led by a (personality) (class)."
    );
  }

  generate() {
    document.getElementById(this.text_output_id).innerHTML = this.replaceText(
      document.getElementById(this.textarea_id).value
    );
  }

  addText(category) {
    let textarea = document.getElementById(this.textarea_id);
    let text = textarea.value;
    let cursorposition = textarea.selectionStart;
    text =
      text.substring(0, textarea.selectionStart) +
      "(" +
      category +
      ") " +
      text.substring(textarea.selectionEnd, text.length);
    textarea.value = text;
    textarea.selectionStart = cursorposition + category.length + 3;
    textarea.selectionEnd = cursorposition + category.length + 3;
    textarea.focus();
  }

  setPregen() {
    document.getElementById(this.textarea_id).value = this.preGenerated();
  }
}

var rrg = new RandomRegionGenerator(
  "text",
  "generate_button",
  "generated",
  "buttons"
);
