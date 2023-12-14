import { Component, Input, OnInit } from "@angular/core";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.css"],
})
export class PokemonFormComponent implements OnInit {
  @Input()
  pokemon!: Pokemon;
  types: string[] | undefined;
  isAddForm: boolean | undefined;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    //pokemonTypeList
    this.types = this.pokemonService.getPokemonTypeList();
    //Si l'url inclue le terme add alors il s'agit d'un ajout de pokemon.
    this.isAddForm = this.router.url.includes("add");
  }

  hasType(type: string): boolean | undefined {
    return this.pokemon?.types.includes(type);
  }

  selectType($event: Event, type: string) {
    //On converti l'élément en html.
    const isChecked: boolean | undefined = ($event.target as HTMLInputElement)
      .checked;

    if (isChecked) {
      //Si il coche la case on ajoute le type de pokemon
      this.pokemon.types.push(type);
    } else {
      //On retire le type
      //ON sait l'index dans le tableau du type de pokemon qu'on veut retirer
      const index = this.pokemon?.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }
  //L'utilisateur doit selectionner au moins 1 type
  isTypesValid(type: string): boolean {
    //Si le pokemon a qu'un seul type, on bloque la checkbox pour pas que l'utilisateur ne puisse l'enlever.
    //Si le pokemon en cours a une longueur qui est egale à 1, on veut bloquer la checkbox qui correspond
    //au type de la checkbox qu'on est en train de valider
    //hasType() = type courant
    if (this.pokemon?.types.length == 1 && this.hasType(type)) {
      //On desactive la checkbox
      return false;
    }
    //List des types de pokemon, si on est à 2 types.
    //On veut lui permettre de decocher les types qu'il a mis mais lui empecher d'en ajouter un autre
    //IL peut deselectionner un des trois types qu'il a choisi
    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }
    //Les types sont valides
    return true;
  }

  onSubmit() {
    if (this.isAddForm) {
      this.pokemonService
        .addPokemon(this.pokemon)
        .subscribe((pokemon: Pokemon) =>
          this.router.navigate(["/pokemon", pokemon.id])
        );
    } else {
      this.pokemonService.updatePokemon(this.pokemon).subscribe(() => {
        //On redirige l'utilisateur sur la page qu'il vient d'éditer
        //s'il n'y a pas d'erreur
        this.router.navigate(["/pokemon", this.pokemon?.id]);
      });
    }
  }
}
