import {Component, Input} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";
import {PokemonService} from "../../services/pokemon.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PagedData} from "../../models/paged-data.model";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {

  pokemon?: Pokemon;

  @Input() pokemonid?: number;


  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private router: Router) {
  }

// go back sans Location mais avec un routeurLink vers /pokemons
  goBack() {
    //this.router.getCurrentNavigation()?.previousNavigation;
    this.goBack;

  }

  // quand le input change, donc quand on clique sur un pokemon sur la liste = changement input donc appel de ngOnChanges
  ngOnChanges(): void {
    this.getPokemons();
  }

  getPokemons() {
    if(this.pokemonid) {
      this.pokemonService.getPokemon(this.pokemonid).subscribe(myResult =>
        this.pokemon = myResult);
    }
  }

}
