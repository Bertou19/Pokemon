export class Pokemon {
  id!: number;
  hp!: number;
  cp!: number;
  name!: string;
  picture!: string;
  types!: Array<string>;
  created!: Date;

  constructor(
    name: string = "Entrer un nom...",
    hp: number = 100,
    cp: number = 10,
    picture: string = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/www/png",
    types: string[] = ["Normal"],
    created: Date = new Date()
  ) {
    this.hp = hp;
    this.cp = cp;
    this.name = name;
    this.picture = picture;
    this.types = types;
    this.created = created;
  }
}
