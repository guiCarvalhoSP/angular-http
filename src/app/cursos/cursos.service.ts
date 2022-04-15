import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators'
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
}
