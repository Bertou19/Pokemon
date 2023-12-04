import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
//On vient importer la constante avec les données
import { POKEMONS } from "./mock-pokemon-list";
import { Pokemon } from "./pokemon";

@Component({
  selector: "app-root",

  //On permet d'afficher la vue correspondante
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
  //On va chercher la constante POKEMON, on la place dans la variable et on type avec Typescript
  //pour éviter de pouvoir entrer des données en dur
  pokemonList: Pokemon[] = POKEMONS;
  //On affiche le pokemon selectionné, il va être poussé avec l'interpolation dans le template
  //On met undefined qui il peut ne pas exister dans la const pokemon methode selectPokemon
  pokemonSelected: Pokemon | undefined;

  ngOnInit() {
    console.table(this.pokemonList);
  }

  selectPokemon(pokemonId: string) {
    //On converti le pokemonId en un nombre
    const id = +pokemonId;
    const pokemon: Pokemon | undefined = this.pokemonList.find(
      //On passe une fonction pour voir si dans la liste il y a un pokemon qui a l'id qu'on recherche
      //On converti la string en nombre
      (pokemon) => pokemon.id == +pokemonId
    );
    if (pokemon) {
      console.log(`Vous avez demandé le pokemon ${pokemon.name}`);
      //On initilise la méthode pokemonSelected
      //On la met à jour
      this.pokemonSelected = pokemon;
    } else {
      console.log(`Vous avez demandé un pokemon qui n'existe pas`);
      this.pokemonSelected = pokemon;
    }
  }
}
//L'utilisateur saisi un nombre dans le template, celui ci est détecté cote composant par la méthode selectPokemon,
//qui va mettre à jour dans la méthode pokemonSelected,
//ensuite cette propriété est poussée dans le template grâce à l'interpolation au niveau pokemonselected
//
