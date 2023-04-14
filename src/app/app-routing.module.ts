import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "./pokemons/pokemon-list/pokemon-list.component";
import {PokemonDetailComponent} from "./pokemons/pokemon-detail/pokemon-detail.component";
import {PokedexComponent} from "./pokemons/pokedex/pokedex.component";
import {LoginComponent} from "./login/login.component";
import {TeamComponent} from "./team/team.component";

const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent},
  { path: 'pokemons/:id', component: PokemonDetailComponent},
  { path: 'pokedex', component: PokedexComponent},
  { path: 'login', component: LoginComponent},
  { path: 'team', component: TeamComponent},
  { path: '', redirectTo: '/pokedex', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
