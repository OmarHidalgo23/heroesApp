import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interfaces';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.baseURL
  private _auth: Auth | undefined

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) { }

  verificaAuth(): Observable<boolean> {
    if (!localStorage.getItem('id')) {
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`)
      .pipe(
        map(auth => {
          this._auth = auth;
          return true;
        })
      )
  }

  login() {
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`)
      .pipe(
        tap(resp => this._auth = resp),
        tap(resp => localStorage.setItem('id', resp.id))
      );
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem('id');
  }

}
