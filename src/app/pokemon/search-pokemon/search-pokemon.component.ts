import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "app-search-pokemon",
  templateUrl: "./search-pokemon.component.html",
})
export class SearchPokemonComponent implements OnInit {
  //classe subject qui appartient à RxJs qui va stocker les successions de recherche de l'utilisateur, ça nous permet de piloter un observable
  //ça permet de construire un flux de données et pas seulement de le consommer comme avec l'observable
  searchTerms = new Subject<string>();
  pokemons$ = Observable<Pokemon[]>;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  search(term: string) {
    //A chaque fois que l'utilisateur recherche un terme on va venir pousser le term et obtenir le flux de données en sortie
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ["/pokemon", pokemon.id];
    this.router.navigate(link);
  }
}
