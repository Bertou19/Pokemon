import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../pokemon.service";
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from "../pokemon";

@Component({
  selector: "app-edit-pokemon",
  template: `
    <h2 class="center">Editer {{ pokemon?.name }}</h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture" />
    </p>
    <!-- On lie la propriété d'entrée pokemon grâce au input de pokemon-form.component puisque le formulaire existe déjà -->
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
  styles: ``,
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private PokemonService: PokemonService
  ) {}

  ngOnInit() {
    //Je recupère l'identifiant depuus l'url
    const pokemonId: string | null = this.route.snapshot.paramMap.get("id");
    if (pokemonId) {
      //Je vais chercher le pokemon associé grâce au PokemonService
      this.PokemonService.getPokemonById(+pokemonId).subscribe(
        (pokemon) => (this.pokemon = pokemon)
      );
    } else {
      //Si il n'y en a pas on met undefined
      this.pokemon = undefined;
    }
  }
}
