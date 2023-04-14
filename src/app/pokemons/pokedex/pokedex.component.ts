import {Component, Output} from '@angular/core';
import {PokemonListComponent} from "../pokemon-list/pokemon-list.component";
import {PokemonDetailComponent} from "../pokemon-detail/pokemon-detail.component";
import {PokemonService} from "../../services/pokemon.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {

  pokemonsList?: PokemonListComponent;

  pokemonDetail?: number;

 /* constructor(
    private router: Router
  ) { }

  // pour que le refresh avec l'id du pokemon selectionné se fasse
  // ne pas le faire comme ça mais avec des input et des output
  public ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }*/

  selectPokemon(pokemon: number) {
    return this.pokemonDetail = pokemon;
  }


}
