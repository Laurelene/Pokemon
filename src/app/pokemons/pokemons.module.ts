import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokemonListComponent} from "./pokemon-list/pokemon-list.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import {RouterModule} from "@angular/router";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { PokedexComponent } from './pokedex/pokedex.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";



@NgModule({
    declarations: [
        PokemonListComponent,
        PokemonDetailComponent,
        PokedexComponent
    ],
  exports: [
    PokemonListComponent,
    PokedexComponent
  ],
    imports: [
        CommonModule,
        MatListModule,
        RouterModule,
        MatIconModule,
        InfiniteScrollModule,
        MatSidenavModule,
        MatInputModule
    ]
})
export class PokemonsModule { }
