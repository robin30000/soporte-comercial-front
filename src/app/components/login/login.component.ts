import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ModalSolicitudAccesoComponent } from './modal-solicitud-acceso/modal-solicitud-acceso.component';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';

export interface Usuario {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatProgressSpinner,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user1: any;
  loding = false;

  @ViewChild('lform') loginFormDirective: any;

  formErrors = {
    username: '',
    password: '',
  };

  validationMsj = {
    username: {
      required: 'El nombre de usuario es obligatorio',
    },
    password: {
      required: 'Debe escribir la contraseña',
    },
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: Dialog
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public iniciarSesion() {
    this.loding = true;
    let login = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.authService.login(login).subscribe((res) => {
      this.loding = false;
      if (res.state == '1') {
        let perfil = res.data.Perfil;
        localStorage.setItem('perfil', perfil);
        localStorage.setItem('user', this.loginForm.value.username);
        localStorage.setItem('menu', JSON.stringify(res.data.menu));

        switch (perfil) {
          case '2':
            this.router.navigate(['ventas-instale-tiendas']);
            break;
          case '3':
            this.router.navigate(['Gescom']);
            break;
          case '4':
            this.router.navigate(['ConsultaEquiposInstalados']);
            break;
          case '5':
            this.router.navigate(['ConsultaPedido']);
            break;
          default:
            this.router.navigate(['ConsultaEquiposInstalados']);
        }
      } else if (res.state == '2') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.msj,
          timer: 6000,
          showCancelButton: true,
          confirmButtonText: 'Olvide mi contraseña',
          cancelButtonText: 'Cerrar',
        }).then((result) => {
          if (result.isConfirmed) {
            // Si el usuario hace clic en "Ir a otra página"
            //window.location.href = "https://tupagina.com/otra_pagina"; // Reemplaza con la URL deseada
            window.open(
              'https://gestionatucuenta.tigoune.com/sigma/app/index?breakGlass=true#/forgot-password',
              '_blank'
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Si el usuario hace clic en "Cerrar" o hace clic fuera de la alerta
            // Aquí puedes añadir cualquier otra acción que desees realizar
          }
        });
      } else if (res.state == '3') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.msj,
          timer: 6000,
          showCancelButton: true,
          confirmButtonText: 'Solicitar acceso',
          cancelButtonText: 'Cerrar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialog.open<string>(ModalSolicitudAccesoComponent);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Si el usuario hace clic en "Cerrar" o hace clic fuera de la alerta
            // Aquí puedes añadir cualquier otra acción que desees realizar
          }
        });
      } else if (res.state == '4') {
        Swal.fire({
          icon: 'error',
          title: res.msj,
          //text: res.msj,
          timer: 8000,
          //showCancelButton: true,
          //confirmButtonText: 'Solicitar acceso pepe',
          cancelButtonText: 'Cerrar',
        });
      }
    });
  }

  ngOnInit(): void {}
}
