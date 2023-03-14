import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../services/auth.service';
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
  loding= false;
  
  @ViewChild('lform') loginFormDirective: any;

  
  formErrors = {
    username: '',
    password: ''
  }

  validationMsj = {
    'username' : {
      'required' : 'El nombre de usuario es obligatorio'
    },
    'password' : {
      'required' : 'Debe escribir la contraseña'
    }
  }

  constructor(private router:Router,
    private fb: FormBuilder,
    private alerts: MatSnackBar,
    private authService: AuthService) { 
      this.loginForm = this.fb.group({
        username: ['',Validators.required],
        password: ['',Validators.required]
      })
    }

    public iniciarSesion(){
      let login = {
        'username': this.loginForm.value.username,
        'password' : this.loginForm.value.password
      }
  
      this.authService.login(login).subscribe(res => {

        console.log(res[1]);
        if(res[1]==200){
          localStorage.setItem('user', this.loginForm.value.username)
          this.router.navigate(['ConsultaPedido']);
        }else if(res[1]==400){
          this.alerts.open(res[0],'Cerrar',{duration:4000})
        }
        },
        error => this.alerts.open(error.error,'Cerrar',{duration:4000}));
  
    }
    

  ngOnInit(): void {
  }

}
