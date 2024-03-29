import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {Pokemon} from "../models/pokemon.model"
import {PagedData} from "../models/paged-data.model";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {LoginComponent} from "../login/login.component";


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  accessToken?: string;

  pokemonsUrl: string = "http://pokedex-api.cleverapps.io/pokemons"

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  private log(message: string): void {
    this.messageService.addMessage(`PokemonService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // on regarde si la personne est connecté en vérifiant si l'access token est remplit
  isConnected(): boolean {
    if(this.accessToken) {
      return true;
    }

    return false;
  }


  getPokemons(): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.pokemonsUrl).pipe(
      tap(() => this.log("fetched pokemons")),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons',))
    );
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url = this.pokemonsUrl + "/" + id;

    return this.http.get<Pokemon>(url).pipe(
      tap(() => this.log(`PokemonService: fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  getPokemonScroll(offset: number, limit: number): Observable<PagedData<Pokemon>> {
    const url = this.pokemonsUrl + "?offset=" + offset + "&limit=" + limit;

    return this.http.get<PagedData<Pokemon>>(url).pipe(
      tap(() => this.log(`PokemonService: fetched pokemon offset=${offset} limit=${limit}`)),
      catchError(this.handleError<PagedData<Pokemon>>(`getPokemon offset=${offset} limit=${limit}`))
    );
  }


  getPokemonsSearch(search: string): Observable<PagedData<Pokemon>> {
    const url = this.pokemonsUrl + "?search=" + search;

    return this.http.get<PagedData<Pokemon>>(url).pipe(
      tap(() => this.log(`PokemonService: fetched pokemon search=${search}`)),
      catchError(this.handleError<PagedData<Pokemon>>(`getPokemon search=${search}`))
    );
  }


  postLogin(login: { email: string, password: string }): Observable<any> {

    // revoir URL
    const url = "http://pokedex-api.cleverapps.io/auth/login";

    return this.http.post<any>(url, login).pipe(
      tap(() => this.log(`PokemonService: fetched login`)),
      tap(myResult => this.accessToken = myResult.access_token),
      catchError(this.handleError<any>(`Login`))
    );
  }

  getTeam(): Observable<number[]> {
    const url = "http://pokedex-api.cleverapps.io/trainers/me/team";

    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.accessToken}`)
    }

    return this.http.get<number[]>(url,header).pipe(
      tap(() => this.log(`PokemonService: fetched pokemon team`)),
      catchError(this.handleError<number[]>(`getTeam`))
    );
  }


  updateTeam(team: number[]): Observable<number[]> {

    if(team) {
      const url = "http://pokedex-api.cleverapps.io/trainers/me/team";

      const header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${this.accessToken}`)
      }

      return this.http.put<number[]>(url, team, header).pipe(
        tap(() => this.log(`PokemonService: fetched login`)),
        catchError(this.handleError<number[]>(`Login`))
      );
    }

    else {
      return throwError(new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        error: 'Missing or invalid parameter: team'
      }));
    }
  }

}
