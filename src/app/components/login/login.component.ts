import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { RecoverPassService } from 'src/app/shared/services/recover-pass.service';
import { FormRecoverComponent } from './form-recover/form-recover.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalPerfilMenuComponent } from '../perfil-menu/modal-perfil-menu/modal-perfil-menu.component';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

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
    MatGridTile,
    MatGridList,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
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
    private recover: RecoverPassService,
    public dialog: Dialog,
    //public dialogRef: MatDialogRef<FormRecoverComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }



  public recoverPass = () => {
    console.log('Hola');
    let data = 'Robin';
    const dialogRef = this.dialog.open<FormRecoverComponent, any, any>(
      FormRecoverComponent,
      {
        
      }
    );
    // this.recover.recoverPass(data).subscribe((res) => {      
    //   console.log('perrrti');
      
    // });
    
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  public iniciarSesion() {
    this.loding = true;
    let login = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.authService.login(login).subscribe((res) => {
      this.loding = false;
      if (res.state) {
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
