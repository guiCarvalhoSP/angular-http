import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICurso } from './icurso';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<ICurso[]>(this.API);
  }
}
