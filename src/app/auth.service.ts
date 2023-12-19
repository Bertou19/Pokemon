import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { delay, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string | undefined;

  constructor() {}
  //Un doit vérifier auprès du serveur si l'utilisateur est connecté ou non
  //donc on doit passer par un opé async d'où l'observable
  login(name: string, password: string): Observable<boolean> {
    //On récupère le résultat pour savoir si l'utilisateur est authentifié ou non
    const isLoggedIn = name == "pikachu" && password == "pikachu";
    //Une fois qu'on l'a on le delay dans le temps
    return of(isLoggedIn).pipe(
      delay(1000),
      //On met à jour la propriété isLoggedIn
      tap((isLoggedIn) => (this.isLoggedIn = isLoggedIn))
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
