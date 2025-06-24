const weapons = {
  "木の枝": { power: 1, attribute: "neutral" },
  "棒状のもの": { power: 15, attribute: "holy" },
  "血塗れの剣": { power: 40, attribute: "evil" },
  "探していた剣": { power: 30, attribute: "holy" }
};

let player = {
  hp: 100,
  weapon: null,
  weaponList: [],
  power: 10,
  evade: 0.1,
  attribute: "neutral",
  bag: null,
};

class Enemy {
  constructor(name, hp, power, attribute, evade) {
    this.name = name;
    this.hp = hp;
    this.power = power;
    this.attribute = attribute;
    this.evade = evade;
  }
}
