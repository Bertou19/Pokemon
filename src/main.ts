import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { importProvidersFrom } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { PokemonService } from "./app/pokemon/pokemon.service";
import { AuthGuard } from "./app/auth.guard";
import { provideRouter, Routes } from "@angular/router";
import { InMemoryDataService } from "./app/in-memory-data.service";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";

const routes: Routes = [
  { path: "", redirectTo: "pokemons", pathMatch: "full" },
  {
    path: "",
    canActivate: [AuthGuard],
    providers: [PokemonService],
    loadChildren: () => import("./app/pokemon/pokemon.routes"),
  },
  {
    path: "login",
    title: "Login",
    loadComponent: () =>
      import("./app/login/login.component").then(
        (module) => module.LoginComponent
      ),
  },
  {
    path: "**",
    title: "page not found",
    loadComponent: () =>
      import("./app/page-not-found/page-not-found.component").then(
        (module) => module.PageNotFoundComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        //Mettre à false pour éviter d'avoir à mettre reponse.data.ce qu'on veut.Car par défault
        //la librairie va encapsuler toutes les données dans un élément data.
        dataEncapsulation: false,
      })
    ),

    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
