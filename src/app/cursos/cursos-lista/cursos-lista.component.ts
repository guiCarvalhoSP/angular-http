import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CursosService } from '../cursos.service';
import { ICurso } from '../icurso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos$: Observable<ICurso[]> | undefined;
  
  constructor(private service: CursosService) { }

  ngOnInit(): void {
    this.cursos$ = this.service.list();
  }


}
