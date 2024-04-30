import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RecoverPassService } from 'src/app/shared/services/recover-pass.service';

@Component({
  selector: 'app-recove-pass',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatGridList,
    MatGridTile,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    MatButton,
  ],
  templateUrl: './recove-pass.component.html',
  styleUrl: './recove-pass.component.css',
})
export class RecovePassComponent implements OnInit {
  formulario: FormGroup;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private _recover: RecoverPassService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formulario = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        emailConfirm: ['', [Validators.required, Validators.email]],
      },
      { validator: this.equalValueValidator('email', 'emailConfirm') }
    );
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  equalValueValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ equalValue: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public redirectLogin = () => {
    this.router.navigate(['/login']);
  };

  public enviarFormulario() {
    if (this.formulario.valid) {
      let data = this.formulario.value;
      data.id = this.id;
      this._recover.recoverPass(data).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error interno inténtalo nuevamente en unos minutos.',
        timer: 4000,
      });
    }
  }
}
