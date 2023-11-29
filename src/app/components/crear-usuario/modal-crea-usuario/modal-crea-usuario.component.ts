import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrearUsuarioService } from 'src/app/services/crear-usuario.service';
import Swal from 'sweetalert2';
import { CrearUsuarioComponent } from '../crear-usuario.component';

@Component({
  selector: 'app-modal-crea-usuario',
  templateUrl: './modal-crea-usuario.component.html',
  styleUrls: ['./modal-crea-usuario.component.css'],
})
export class ModalCreaUsuarioComponent implements OnInit {
  perfiles = [
    { id: 2, nombre: 'Venta instale' },
    { id: 3, nombre: 'Gescom' },
    { id: 4, nombre: 'Consulta equipos' },
    { id: 5, nombre: 'Visitas terreno' },
    { id: 6, nombre: 'General' },
    { id: 11, nombre: 'Root' },
  ];
  public desired_columns: any;
  public getScreenWidth: any;
  public getScreenHeight: any;
  public login: any;
  public name: any;
  public doc: any;
  formulario: FormGroup;
  password: any;
  con_pass: any;
  login_user: any;
  pass: any;
  pass_c: any;
  perfil: any;
  canal: any;
  ciudad: any;
  nombre: any;
  cedula: any;

  constructor(
    private fb: FormBuilder,
    private _usuario: CrearUsuarioService,
    private router: Router,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public datos: CrearUsuarioComponent
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      cedula: ['', [Validators.required, Validators.minLength(5)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      con_pass: ['', [Validators.required, Validators.minLength(5)]],
      perfil: ['', Validators.required],
      ciudad: [''],
      canal: [''],
      edit: [''],
    });
  }
  ngOnInit(): void {
    if (localStorage.getItem('user') == null) {
      localStorage.clear();
      this.router.navigate(['login']);
    }
    this.login = localStorage.getItem('user');
    this.perfil = localStorage.getItem('perfil');

    if (!this.perfil) {
      this.router.navigate(['login']);
    }

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.onWindowResize();
    this.formulario.patchValue({
      nombre: this.datos.name,
      cedula: this.datos.doc,
      login: this.datos.login,
      password: this.datos.pass,
      con_pass: this.datos.pass_c,
      perfil: this.datos.perfil,
      canal: this.datos.canal,
      ciudad: this.datos.ciudad,
      edit: this.datos.edit,
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if (this.getScreenWidth < 767) {
      this.desired_columns = 2;
    } else {
      this.desired_columns = 4;
    }
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      if (this.formulario.value.password != this.formulario.value.con_pass) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El campo contraseña y confirmar contraseña no coinciden',
        });
        return;
      }
      this.formulario.value.usuario_crea = this.login;
      const usuario = this.formulario.value;
      this._usuario.guardaUsuario(usuario).subscribe((res) => {
        if (res.state) {
          Swal.fire({
            icon: 'success',
            title: 'Bien',
            text: res.msj,
            timer: 4000,
          }).then(() => {
            this.formulario.reset();
            this.dialogRef.close();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.msj,
            timer: 4000,
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Completa los datos requeridos',
      });
      return;
    }
  }
}
