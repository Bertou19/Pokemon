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
      this.pokemonService
        .getPokemonById(+pokemonId)
        .subscribe((pokemon) => (this.pokemon = pokemon));
    }
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id).subscribe(() =>
      //On redirige l'utilisateur vers la liste des pokémons, une fois que le pokemon est supprimé
      this.goToPokemonList()
    );
  }

  goToPokemonList() {
    this.router.navigate(["/pokemons"]);
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(["/edit/pokemon", pokemon.id]);
  }
}
