import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
export interface Usuario {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
    private alerts: MatSnackBar,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public iniciarSesion() {
    let login = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.authService.login(login).subscribe((res) => {
      if (res.state) {
        let perfil = res.data.Perfil;
        localStorage.setItem('perfil', perfil);
        localStorage.setItem('user', this.loginForm.value.username);
        localStorage.setItem('menu', JSON.stringify(res.data.menu));
console.log(perfil);

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

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.msj,
          timer: 4000,
        });
      }
    });
  }

  ngOnInit(): void {}
}
