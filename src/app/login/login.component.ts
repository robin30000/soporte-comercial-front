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
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user1: any;
  loding = false;

  @ViewChild('lform') loginFormDirective: any;


  formErrors = {
    username: '',
    password: ''
  }

  validationMsj = {
    'username': {
      'required': 'El nombre de usuario es obligatorio'
    },
    'password': {
      'required': 'Debe escribir la contraseña'
    }
  }

  constructor(private router: Router,
    private fb: FormBuilder,
    private alerts: MatSnackBar,
    private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public iniciarSesion() {
    let login = {
      'username': this.loginForm.value.username,
      'password': this.loginForm.value.password
    }

    this.authService.login(login).subscribe(res => {
      if (res[1] == 200400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario y/o Contraseña no Validos',
        })
      }else if (res[1] == 200) {
        let perfil = res[2][0]['Perfil'];
        localStorage.setItem('perfil', perfil)
        if (perfil == 1) {
          localStorage.setItem('user', this.loginForm.value.username)
          this.router.navigate(['ConsultaPedido']);
        } else if (perfil == 2) {
          localStorage.setItem('user', this.loginForm.value.username)
          this.router.navigate(['Ventas']);
        } else if (perfil == 3) {
          localStorage.setItem('user', this.loginForm.value.username)
          this.router.navigate(['ventas-instale-tiendas']);
        } else if (perfil == 4) {
          localStorage.setItem('user', this.loginForm.value.username)
          this.router.navigate(['ConsultaPedido']);
        }
      }
    })
  }


  ngOnInit(): void {
  }

}
