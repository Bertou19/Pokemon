import { Component } from "@angular/core";
import { POKEMONS } from "../mock-pokemon-list";
import { Pokemon } from "../pokemon";
import { Router, RouterLink } from "@angular/router";
import { PokemonService } from "../pokemon.service";
import { PokemonTypeColorPipe } from "../pokemon-type-color.pipe";
import { BorderCardDirective } from "../../border-card.directive";
import { NgFor, DatePipe } from "@angular/common";
import { SearchPokemonComponent } from "../search-pokemon/search-pokemon.component";
@Component({
    selector: "app-list-pokemon",
    templateUrl: "./list-pokemon.component.html",
    standalone: true,
    imports: [
        SearchPokemonComponent,
        NgFor,
        BorderCardDirective,
        RouterLink,
        DatePipe,
        PokemonTypeColorPipe,
    ],
})
export class ListPokemonComponent {
  pokemonList: Pokemon[] | undefined;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    //On recupère un observable depuis mon service
    this.pokemonService
      .getPokemonList()
      //subscribe va permettre de s'abonner au service,
      //on recupère la pokemonList et on la pousse dans la propriété du composant
      .subscribe((pokemonList) => (this.pokemonList = pokemonList));
  }

  //Lorsque l'utilisateur clique sur un pokémon, il est passé en paramètre
  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(["/pokemon", pokemon.id]);
  }
}
