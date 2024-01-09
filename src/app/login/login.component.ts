import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styles: ``,
    standalone: true,
    imports: [FormsModule, NgIf],
})
export class LoginComponent {
  message: string = "Vous êtes déconnecté.(pikachu/pikachu)";
  name!: string;
  password!: string;
  auth!: AuthService;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    //On restocke directement car on l'utilise dans le template
    this.auth = this.authService;
  }

  setMessage() {
    if (this.auth.isLoggedIn) {
      this.message = "Vous êtes connecté";
    } else {
      this.message = "Identifiant ou mot de pass incorrect";
    }
  }

  //Connecte l'utilisateur auprès du guard
  login() {
    this.message = "tentative de connexion en cours...";
    this.auth
      .login(this.name, this.password)
      .subscribe((isLoggedIn: boolean | undefined) => {
        this.setMessage();
        console.log("coucou");
        if (isLoggedIn) {
          this.router.navigate(["/pokemons"]);
        } else {
          this.password = "";
          this.router.navigate(["/login"]);
        }
      });
  }

  logout() {
    this.auth.logout();
    this.message = "Vous êtes déconnecté";
  }
}
