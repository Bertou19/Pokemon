import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";
@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
  styles: ``,
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[] | undefined;
  pokemon: Pokemon | undefined; //propriété qui contient un pokemon à afficher

  //On injecte le service ActivatedRoute pour aller chercher l'information dont on a besoin à partir de l'url
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    //Aller chercher l'id contenu dans l'url
    const pokemonId: string | null = this.route.snapshot.paramMap.get("id");
    //Si il existe on attribue à la propriété Pokemon, l'id qui correspond à cet identifiant.
    if (pokemonId) {
      //C'est une string mais on veut un nombre donc on met un +
      this.pokemon = this.pokemonService.getPokemonById(+pokemonId);
    }
  }
  goToPokemonList() {
    this.router.navigate(["/pokemons"]);
  }
}
