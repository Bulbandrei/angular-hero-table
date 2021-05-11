import { Hero, HeroResponse } from './hero';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
//10226367594562093	
  private heroesUrl = 'https://superheroapi.com/api/10226367594562093';
  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => console.log(`retornou heroi id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if (!term.trim()){
      return of ([]);
    }
    return this.http.get<HeroResponse>(`${this.heroesUrl}/search/${term}`).pipe(
      tap(v => console.log("tap aqui")),map((heroResponse: HeroResponse) => {
        return heroResponse.results;
      },tap(x => console.log("passou")))
    );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      //this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
