import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CursosService } from '../cursos.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

import { ICurso } from '../icurso';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos$: Observable<ICurso[]> | undefined;
  error$ = new Subject<boolean>();

  bsModalRef: BsModalRef;


  constructor(private service: CursosService, 
    private alertService: AlertModalService) { }

  ngOnInit(): void {
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        //this.error$.next(true);
        this.handleError();
        return empty();
      })
    )
  }

  handleError(){
    this.alertService.showAlertDanger("Erro ao carregar, entre em contato com o suporte");
  }

}
