import {Component, EventEmitter, Output} from '@angular/core';
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

  @Output() pokemonSelect:EventEmitter<number> = new EventEmitter();

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    return this.pokemonService.getPokemons().subscribe(myResult =>
      this.pokemons= myResult);
  }

  onScroll() {
    if(this.pokemons)
      this.pokemonService.getPokemonScroll(this.pokemons?.offset+this.pokemons?.limit,this.pokemons?.limit).subscribe(myResult => {
        this.pokemons = {
          ...myResult,
          data: (this.pokemons?.data || []).concat((myResult.data))
        }
      });
  }

  getPokemon(id: number) {
    this.pokemonSelect.emit(id);
  }

  searchPokemons(value: string) {
    // afficher les pokémons trouvés
   return this.pokemonService.getPokemonsSearch(value).subscribe(myResult =>
      this.pokemons= myResult);
  }


}
