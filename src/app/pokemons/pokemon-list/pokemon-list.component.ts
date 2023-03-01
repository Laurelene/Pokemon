import { Component } from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {PagedData} from "../../models/paged-data.model";
import {Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  pokemons?: PagedData<Pokemon>;

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    return this.pokemonService.getPokemons().subscribe(myResult =>
      this.pokemons= myResult);
  }


}
