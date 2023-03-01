import {Component, Input} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";
import {PokemonService} from "../../services/pokemon.service";
import {ActivatedRoute} from "@angular/router";
import {PagedData} from "../../models/paged-data.model";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {

  @Input() pokemon?: Pokemon;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) {
  }

// go back sans Location mais avec un routeurLink vers /pokemons


  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.pokemonService.getPokemon(id).subscribe(myResult =>
      this.pokemon = myResult);
  }

}