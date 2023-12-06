import { Component } from "@angular/core";
import { POKEMONS } from "../mock-pokemon-list";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";
@Component({
  selector: "app-list-pokemon",
  templateUrl: "./list-pokemon.component.html",
  styles: ``,
})
export class ListPokemonComponent {
  pokemonList: Pokemon[] = POKEMONS;

  constructor(private router: Router) {}
  //Lorsque l'utilisateur clique sur un pokémon, il est passé en paramètre
  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(["/pokemon", pokemon.id]);
  }
}
