const weapons = {
  "Stick":        { power: 5, attribute: "neutral" },
  "Sword":        { power: 15, attribute: "holy" },
  "Curse Blade":  { power: 20, attribute: "cursed" },
  "Legendary Sword": { power: 30, attribute: "holy" }
};

let player = {
  hp: 100,
  weapon: null,
  weaponList: [],
  power: 10,
  evade: 0.1,
  attribute: "neutral",
};

class Enemy{
  constructor(name,hp,power,attribute,evade){
    this.name = name;
    this.hp = hp;
    this.power = power;
    this.attribute = attribute;
    this.evade = evade;
  }
}

const enemyPool = [
  new Enemy("ゴブリン", 25, 5, "neutral",0),
  new Enemy("ゾンビ", 35, 6, "cursed",0.1),
  new Enemy("聖騎士", 50, 10, "holy",0.2),
];
