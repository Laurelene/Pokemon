import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonService} from "../services/pokemon.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string="";

  password: string="";

  hide = true;

  constructor(private pokemonService: PokemonService, private router: Router) {
  }


  login() {
    // avec un ngModel
    //this.email=(document.getElementById("email") as HTMLInputElement).value;
    //this.password=(document.getElementById("password") as HTMLInputElement).value;
    //if(this.pokemonService.accessToken!=undefined)
    return this.pokemonService.postLogin({email:this.email, password:this.password}).subscribe(myResult =>
    {if(this.pokemonService.accessToken!=undefined) this.router.navigateByUrl('/team')});
  }
}
