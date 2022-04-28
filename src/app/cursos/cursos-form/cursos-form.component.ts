import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(private fb:FormBuilder,
     private service:CursosService,
     private modal: AlertModalService,
     private location: Location,
     private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    // this.route.params.pipe(
    //   map((params:any) => params['id']),
    //   switchMap(id => this.service.loadByID(id))

    // )
    // .subscribe((curso) => this.updateForm(curso));

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });


  }

  // updateForm(curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

  hasError(field: string){
    return this.form.get(field).errors;
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.valid){
      console.log('submit');
      this.service.create(this.form.value).subscribe(
        success => {
            this.modal.showAlertSucess('Curso criado com sucesso');
            this.location.back();
          },
          error => { 
          this.modal.showAlertDanger('Erro ao criar novo curso, tente novamente!')
          console.log(error)},
        () => console.log('request completo')
      );
    }
  }

  onCanel(){
    this.submitted = false;
    this.form.reset();

  }

}
