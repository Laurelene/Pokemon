import {EventEmitter, Injectable} from "@angular/core";


// Ce service est utilisé pour partager l'id du pokemon a ajouter
// entre le module du listage des pokemons et le module de la team
// Car le choix du pokemon a ajouter se fait dans le module list
// tandis que l'ajout se fait dans la team

// subject

@Injectable()
export class DataService {

  dataShare = new EventEmitter<number>();

  addPokemonTeam(id:number) {
    this.dataShare.emit(id);
  }

}
