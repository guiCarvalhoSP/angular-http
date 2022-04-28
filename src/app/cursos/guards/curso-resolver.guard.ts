import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CursosService } from '../cursos.service';
import { ICurso } from '../icurso'
@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<ICurso> {
  
  constructor(private service: CursosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICurso> {
    if(route.params && route.params['id']){
      return this.service.loadByID(route.params['id']);
    }

    return of({
      id: null,
      nome: null
    });
  }
  
}
