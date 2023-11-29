import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListMenu, ListPerfil } from 'src/app/interfaces/interfaces';
import { PerfilMenuService } from 'src/app/services/perfil-menu.service';
import Swal from 'sweetalert2';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ModalPerfilMenuComponent } from './modal-perfil-menu/modal-perfil-menu.component';
@Component({
  selector: 'app-perfil-menu',
  templateUrl: './perfil-menu.component.html',
  styleUrls: ['./perfil-menu.component.css'],
})
export class PerfilMenuComponent implements OnInit {
  login: any;
  perfil: any;
  getScreenWidth: any;
  getScreenHeight: any;
  listMenu: ListMenu[] = [];
  listPerfil: ListPerfil[] = [];

  displayedColumns: string[] = ['Menu'];
  dataSource: any;

  displayedColumnsPerfil: string[] = ['Perfil', 'Estado', 'Acción'];
  dataSourcePerfil: any;

  getTableData() {
    this._perfil.listMenu().subscribe((res) => {
      this.dataSource = res;
    });
  }

  getTablePerfil() {
    this._perfil.listPerfil().subscribe((res) => {
      this.dataSourcePerfil = res;
    });
  }

  constructor(
    private _perfil: PerfilMenuService,
    private router: Router,
    public dialog: Dialog
  ) {}

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

    this.getTableData();
    this.getTablePerfil();
  }


  editaMenu(id: number, estado: string): void {
    this._perfil.editaMenu(id, estado).subscribe((res) => {
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
  }

  public editaPerfil(id: number): void {
    this._perfil.editaPerfil(id).subscribe((res) => {      
      const dialogRef = this.dialog.open<ModalPerfilMenuComponent, any, any>(
        ModalPerfilMenuComponent,
        {
          data: res.msj
        }
      );
    });
  }
}
