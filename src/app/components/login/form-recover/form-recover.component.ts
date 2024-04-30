import { Component } from '@angular/core';
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
import { RecoverPassService } from 'src/app/shared/services/recover-pass.service';
import Swal from 'sweetalert2';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule } from 'ng-recaptcha';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-form-recover',
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
    RecaptchaModule,
  ],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: 'TU_SITE_KEY' }],
  templateUrl: './form-recover.component.html',
  styleUrl: './form-recover.component.css',
})
export class FormRecoverComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _recover: RecoverPassService,
    public dialog: Dialog
  ) {
    this.formulario = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        emailConfirm: ['', [Validators.required, Validators.email]],
      },
      { validator: this.equalValueValidator('email', 'emailConfirm') }
    );
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

  public onNoClick = () => {
    this.dialog.closeAll();
  };

  public enviarFormulario() {
    if (this.formulario.valid) {
      let data = this.formulario.value;
      this._recover.recoverPass(data).subscribe({
        next: (data) => {
          if (data.state) {
            Swal.fire({
              icon: 'success',
              title: 'Bien',
              text: data.msg,
              timer: 10000,
            }).then(() => {
              this.dialog.closeAll();
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.msg,
              timer: 10000,
            });
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifica los datos del formulario',
        timer: 5000,
      });
    }
  }
}
