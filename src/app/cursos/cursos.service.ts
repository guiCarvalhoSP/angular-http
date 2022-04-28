import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take } from 'rxjs/operators'
import { ICurso } from './icurso';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}`;
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<ICurso[]>(this.API)
    .pipe(
      delay(2000)
    );
  }

  loadByID(id) {
    return this.http.get<ICurso>(`${this.API}/${id}`).pipe(take(1));
  }

  create(curso){
    return this.http.post(this.API, curso).pipe(take(1));
  }
}
