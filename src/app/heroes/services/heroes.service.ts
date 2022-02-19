import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseURL: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  getHeroes() {
    return this.http.get<Heroe[]>(`${this.baseURL}/heroes`);
  }

  getHeroesByID(id: string) {
    return this.http.get<Heroe>(`${this.baseURL}/heroes/${id}`);
  }

  getHeroesSugerencia(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseURL}/heroes/?q=${termino}&_limit=6`);
  }

  postAgregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseURL}/heroes`, heroe)
  }

  putEditarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseURL}/heroes/${heroe.id}`, heroe)
  }

  deleteBorrarHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/heroes/${id}`)
  }

}
