import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs";
import { PokemonService } from "../pokemon.service";
import { NgFor, AsyncPipe } from "@angular/common";

@Component({
    selector: "app-search-pokemon",
    templateUrl: "./search-pokemon.component.html",
    standalone: true,
    imports: [NgFor, AsyncPipe],
})
export class SearchPokemonComponent implements OnInit {
  //classe subject qui appartient à RxJs qui va stocker les successions de recherche de l'utilisateur, ça nous permet de piloter un observable
  //ça permet de construire un flux de données et pas seulement de le consommer comme avec l'observable
  searchTerms = new Subject<string>();
  pokemons$ = Observable<Pokemon[]>;
  pokemons: any;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // this.pokemons.subscribe((pokemons: any) => (this.pokemons = pokemons));
    //Va permettre de supprimer les termes de recherches qui sont trop succins,
    //eliminer des requetes dont on a pas besoin.
    this.pokemons = this.searchTerms.pipe(
      debounceTime(300),
      //On obtient un nouveau flux sans reches identiques(quand l'utilisateur tape deux fois la meme recherche)
      distinctUntilChanged(),
      //Permet de recupérer le tableau de pokemon qui correspond au terme entré par l'utilisateur (dernière requete envoyée au serveur
      //On a annulé les précédentes requêtes avec switchMap)
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
  }

  search(term: string) {
    //A chaque fois que l'utilisateur recherche un terme on va venir pousser le term et obtenir le flux de données en sortie
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ["/pokemon", pokemon.id];
    this.router.navigate(link);
  }
}
