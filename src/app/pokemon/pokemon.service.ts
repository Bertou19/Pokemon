import { Injectable } from "@angular/core";
import { Pokemon } from "./pokemon";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, of, tap } from "rxjs";

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  //Si il y a des données il les retournent, il
  getPokemonList(): Observable<Pokemon[]> {
    //On retourne un flux qui contient les pokémons
    //On fait une requête http et on va recevoir un observable
    return this.http.get<Pokemon[]>("api/pokemons").pipe(
      //On log la reponse
      //tap: equivalent d'un console.log mais pour un observable
      tap((response) => this.log(response)),
      catchError((error) =>
        //On retourne un tableau vide pour eviter
        //de faire planter l'application au cas ou il y a une erreur
        this.handleError(error, [])
      )
    );
  }
  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    //Si l'utilisateur tape moins de 2 caractères ça n'appelle pas le serveur
    if (term.length <= 1) {
      //Si il y moins de deux caractères, cela retourne un tableau de flux vide
      return of([]);
    }

    //Il retourne un terme de recherche de l'utilisateur
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  //méthode pour prendre en paramètre un pokemon et aller sauvegarder ses données dans le serveur
  updatePokemon(pokemon: Pokemon): Observable<null> {
    //On precise au client http d'angular qu'on va envoyer des requetes
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    //put est une requete de modification
    return this.http.put("api/pokemons", pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post<Pokemon>("api/pokemons", pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    //tranforme une donnée simple en flux pour eviter de casser l'interface
    return of(errorValue);
  }

  getPokemonTypeList(): string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Electrik",
      "Poison",
      "Fée",
      "Vol",
      "Combat",
      "Psy",
    ];
  }
}
