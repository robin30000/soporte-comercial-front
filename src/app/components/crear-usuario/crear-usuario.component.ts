import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { CrearUsuarioService } from './../../services/crear-usuario.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import {
  Observable,
  ObservableInput,
  catchError,
  map,
  startWith,
  switchMap,
} from 'rxjs';

import { usuarios } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2';
import { ModalCreaUsuarioComponent } from './modal-crea-usuario/modal-crea-usuario.component';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  public desired_columns: any;
  public getScreenWidth: any;
  public getScreenHeight: any;
  public login: any;
  public perfil: any;
  formulario: FormGroup;

  dataSource = new MatTableDataSource<usuarios>();
  displayedColumns: string[] = [
    'Cédula',
    'Nombre',
    'Login',
    'Perfil',
    'Estado',
    'Acciones',
  ];
  totalItems = 0;
  pageSize = 10;
  Cedula = 0;
  pageNumber = 1;
  listUsuario: usuarios[] = [];
  name: any;
  doc: any;
  password: any;
  pass_c: any;
  canal: any;
  ciudad: any;
  pass: any;
  edit: any;

  getTableData$(pageNumber: Number, pageSize: Number, Cedula: any) {
    return this._usuario.listUsuario(pageNumber, pageSize, Cedula);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuario: CrearUsuarioService,
    private _MatPaginatorIntl: MatPaginatorIntl,
    public dialog: Dialog,
    public nombre: Dialog
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
    this._MatPaginatorIntl.itemsPerPageLabel = 'Item por pagina';
  }

  openDialog(): void {
    this.dialog.open<string>(ModalCreaUsuarioComponent);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.getTableData$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize,
            this.Cedula
          ).pipe(catchError(res));
        }),
        map((empData) => {
          if (empData == null) return [];
          return empData;
        })
      )
      .subscribe((empData) => {
        this.listUsuario = empData.data;
        this.totalItems = empData.count;
        this.dataSource = new MatTableDataSource(this.listUsuario);
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

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.getTableData$(1, 10, filterValue).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.listUsuario = res.data;
    });
  }

  editaUsuario(login: any) {
    this._usuario.editaUsuario(login).subscribe((res) => {
      if (res.state) {
        const dialogRef = this.dialog.open<ModalCreaUsuarioComponent, any, any>(
          ModalCreaUsuarioComponent,
          {
            data: {
              name: res.data[0].Nombre,
              doc: res.data[0].Cedula,
              login: res.data[0].Login,
              perfil: parseInt(res.data[0].Perfil),
              pass: res.data[0].Pass,
              pass_c: res.data[0].Pass,
              canal: res.data[0].canal,
              ciudad: res.data[0].ciudad,
              edit: 1,
            },
          }
        );
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

  deleteUsuario(login: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#102b58',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuario.deleteUsuario(login).subscribe((res) => {
          if (res.state) {
            Swal.fire({
              icon: 'success',
              title: 'Bien',
              text: res.msj,
              timer: 4000,
            }).then(() => {
              const currentUrl = this.router.url;
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([currentUrl]);
                });
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La acción fue cancelada', 'error');
      }
    });
  }
}

function res(err: any, caught: Observable<any>): ObservableInput<any> {
  throw new Error('Function not implemented.');
}
