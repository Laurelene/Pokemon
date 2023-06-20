import { Component } from '@angular/core';
import {PagedData} from "../models/paged-data.model";
import {Pokemon} from "../models/pokemon.model";
import {PokemonService} from "../services/pokemon.service";
import {Router} from "@angular/router";
import {forkJoin, map} from "rxjs";
import {PokemonListComponent} from "../pokemons/pokemon-list/pokemon-list.component";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {

  pokemons?: PagedData<Pokemon>;

  team?:Pokemon[];

  teamId?:number[];


  constructor(private pokemonService: PokemonService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getTeam();
    this.getPokemons();
    // Quand l'utilisateur clique sur + pour ajouter un pokemon dans le listage on utilise
    // le dataService pour partager l'id et appeler la fonction d'ajout dans la team
    this.dataService.dataShare.subscribe((id) => {
      this.addPokemon(id);
    })
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

  searchPokemons(value: string) {
    // afficher les pokémons trouvés
    return this.pokemonService.getPokemonsSearch(value).subscribe(myResult =>
      this.pokemons= myResult);
  }


  // récupérer les pokemons de l'équipe de la personne connecté
  getTeam() {
    return this.pokemonService.getTeam().subscribe(myResult => {this.teamId=myResult; this.idIntoPokemon(myResult)}
    );
  }


  // l'api retourne un tableau d'id des pokemons de l'équipe
  // il faut donc récupérer les pokemons en fonction de l'id
  idIntoPokemon(teamId:number[]) {

    if(teamId) {
      // parcours du tableau d'id de pokemon
      const pokemonObservables = teamId.map(id=>this.pokemonService.getPokemon(id));

      // forkJoin pour un appel simultané à l'api
      forkJoin(pokemonObservables).subscribe(pokemons => this.team=pokemons);
    }

  }


  // @ts-ignore
  addPokemon(id:number) {

    // vérification que le pokemon n'est pas déjà dans la liste
    let exist = false;
    this.teamId?.forEach((element,index)=>{
      if(element==id) {
        exist = true;
      }
    });

    // compter le nombre de pokemon : max = 6
    if((this.teamId) && (this.teamId.length < 6) && (!exist)) {

      // il faut récuperer le tableau d'id de l'equipe et y ajouter le nouvel id
      this.teamId?.push(id);

      // update l'équipe
      this.pokemonService.updateTeam(this.teamId).subscribe(myResult => {this.teamId=myResult; this.idIntoPokemon(myResult); this.getTeam();}
      );
    }

  }


  // @ts-ignore
  deletePokemon(id:number) {

    if(this.teamId) {
      // on parcours le tableau d'id des pokemons à la recherche du pokemon à enlever et on l'enlève
      this.teamId.forEach((element,index)=>{
        if(element==id) {
          this.teamId?.splice(index,1);
        }
      });

      // Appel API
      this.pokemonService.updateTeam(this.teamId).subscribe(myResult => {this.teamId=myResult; this.idIntoPokemon(myResult); this.getTeam();}
      );

    }
  }


}
