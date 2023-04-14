import {Component, EventEmitter, Output} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {PagedData} from "../../models/paged-data.model";
import {Pokemon} from "../../models/pokemon.model";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  pokemons?: PagedData<Pokemon>;

  isConnected: boolean=false;

  @Output() pokemonSelect:EventEmitter<number> = new EventEmitter();

  constructor(private pokemonService: PokemonService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getPokemons();
    this.idConnected();
  }

  getPokemons() {
    return this.pokemonService.getPokemons().subscribe(myResult =>
      this.pokemons= myResult);
  }

  idConnected() {
    this.isConnected = this.pokemonService.isConnected();
  }

  // Au clic sur le bouton + Pour ajouter un pokemon
  // on envoie l'id à la team via le dataService
  addPokemon(id: number) {
    this.dataService.addPokemonTeam(id);
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
