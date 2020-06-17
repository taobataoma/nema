import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class AuthService {
  apiSignin = 'api/auth/signin';
  apiSignup = 'api/auth/signup';

  constructor(
    private http: HttpClient,
  ) {
  }

  /** GET heroes from the server */
  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       catchError(this.handleError('getHeroes', []))
  //     );
  // }

  /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   term = term.trim();
  //
  //   // Add safe, URL encoded search parameter if there is a search term
  //   const options = term ?
  //     {params: new HttpParams().set('name', term)} : {};
  //
  //   return this.http.get<Hero[]>(this.heroesUrl, options)
  //     .pipe(
  //       catchError(this.handleError<Hero[]>('searchHeroes', []))
  //     );
  // }

  //////// Save methods //////////

  /** POST: signup a new user to the database */
  signup(user, cbOk = null, cbError = null, cbComplate = null) {
    return this.http.post(this.apiSignup, user, httpOptions)
      .subscribe(
        data => {
          if (cbOk) {
            cbOk(data);
          }
        },
        err => {
          if (cbError) {
            cbError(err);
          }
        },
        () => {
          if (cbComplate) {
            cbComplate();
          }
        }
      );
  }

  /** DELETE: delete the hero from the server */
  // deleteHero(id: number): Observable<{}> {
  //   const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('deleteHero'))
  //     );
  // }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  // updateHero(hero: Hero): Observable<Hero> {
  //   httpOptions.headers =
  //     httpOptions.headers.set('Authorization', 'my-new-auth-token');
  //
  //   return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('updateHero', hero))
  //     );
  // }
}
