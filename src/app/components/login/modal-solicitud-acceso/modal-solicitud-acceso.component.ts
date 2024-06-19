import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { DialogRef } from '@angular/cdk/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-solicitud-acceso',
  standalone: true,
  imports: [
    MatProgressSpinner,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatCard,
    MatGridTile,
    MatGridList,
  ],
  templateUrl: './modal-solicitud-acceso.component.html',
  styleUrl: './modal-solicitud-acceso.component.css',
})
export class ModalSolicitudAccesoComponent {
  solicitudForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: DialogRef<string>
  ) {
    this.solicitudForm = this.fb.group({
      usuario: ['', Validators.required],
      cc: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      observacion: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.solicitudForm.valid) {
      const usuario = this.solicitudForm.value;
      console.log(usuario);

      this.authService.SolicitaAcceso(usuario).subscribe((res) => {
        if (res.state) {
          Swal.fire({
            icon: 'success',
            title: 'Bien',
            text: res.msg,
            timer: 8000,
          }).then(() => {
            this.solicitudForm.reset();
            this.dialogRef.close();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.msg,
            timer: 6000,
          });
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
