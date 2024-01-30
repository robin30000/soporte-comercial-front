import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilMenuService } from 'src/app/shared/services/perfil-menu.service';
import Swal from 'sweetalert2';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgStyle } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
    selector: 'app-modal-perfil-menu',
    templateUrl: './modal-perfil-menu.component.html',
    styleUrls: ['./modal-perfil-menu.component.css'],
    standalone: true,
    imports: [
        MatGridList,
        MatGridTile,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        NgStyle,
        MatIconButton,
        MatIcon,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
    ],
})
export class ModalPerfilMenuComponent implements OnInit {
  displayedColumns: string[] = ['Perfil', 'Estado', 'Menu', 'Acción'];
  dataSource: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _perfil: PerfilMenuService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public datos: PerfilMenuService
  ) {}
  ngOnInit(): void {
    this.dataSource = this.datos;
  }

  cambiaEstadoMenu(data: object): void {

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Que desea modificar el permiso del menu',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#102b58',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._perfil.cambiaEstadoMenu(data).subscribe((res) => {
          if (res.state) {
            Swal.fire({
              icon: 'success',
              title: 'Bien',
              text: res.msj,
              timer: 4000,
            }).then(() => {
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La acción fue cancelada', 'error');
      }
    })

    // this._perfil.cambiaEstadoMenu(data).subscribe((res) => {
    //   console.log(res, ' PPPP');
    //   if (res.state) {
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Bien',
    //       text: res.msj,
    //       timer: 4000,
    //     }).then(() => {
    //       this.dialogRef.close();
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: res.msj,
    //       timer: 4000,
    //     });
    //   }
    // })
  }
}
