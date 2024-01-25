import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
//import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

//import { MatLegacyPaginator as MatPaginator, MatLegacyPaginatorIntl as MatPaginatorIntl, LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';

import {MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';

import { MatSort, MatSortHeader } from '@angular/material/sort';

import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, Observable, ObservableInput, startWith, switchMap } from 'rxjs';
import { RespuestaPedidoVenta, VentasInstaleTienda } from 'src/app/shared/interfaces/interfaces';
import { VentaInstaleService } from 'src/app/shared/services/venta-instale.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
import { CdkAccordion, CdkAccordionItem } from '@angular/cdk/accordion';
import { MatBadge } from '@angular/material/badge';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMiniFabButton, MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { HeaderComponent } from '../../shared/header/header.component';


@Component({
    selector: 'app-ventas-instale-tiendas',
    templateUrl: './ventas-instale-tiendas.component.html',
    styleUrls: ['./ventas-instale-tiendas.component.css'],
    standalone: true,
    imports: [HeaderComponent, MatTabGroup, MatTab, MatGridList, MatGridTile, NgIf, MatCard, MatCardContent, NgFor, ReactiveFormsModule, MatFormField, NgClass, MatLabel, MatInput, MatMiniFabButton, MatTooltip, MatIcon, MatHint, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatSelect, MatOption, MatButton, MatBadge, MatIconButton, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, CdkAccordion, CdkAccordionItem, MatPaginator]
})

export class VentasInstaleTiendasComponent implements OnInit {

  region: any[] = [
    'Andina',
    'Norte',
    'Sur',
    'Centro'
  ];

  jornada: any[] = [
    'AM',
    'PM',
    'MASIVO'
  ]

  expandedIndex = 0;

  form: FormGroup;
  public datos: Array<any> = [];
  public getScreenWidth: any;
  public getScreenHeight: any;
  public desired_columns: any;
  public state: number = 0;
  public ok: number = 0;
  public error: number = 0;
  public pend: number = 0;
  public perfil: any;
  public login: any;
  public state_tecnico: number = 0;
  public minDate: Date;
  public countObservaciones: number = 0;
  public datosObervaciones: any;

  dataSource = new MatTableDataSource<RespuestaPedidoVenta>;
  displayedColumns: string[] = ['pedido', 'observacion_gestion', 'tipificacion', 'obs_tipificacion', 'fecha_ingreso', 'fecha_gestion'];

  totalItems = 0;
  pageSize = 10;
  pedido = 0
  pageNumber = 1;
  listPedido: RespuestaPedidoVenta[] = [];

  getTableData$(pageNumber: Number, pageSize: Number, pedido: any) {
    return this._ventaInstale.respuestasPedidos(pageNumber, pageSize, this.login, pedido);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _ventaInstale: VentaInstaleService,
    private router: Router,
    private _MatPaginatorIntl: MatPaginatorIntl,
    private filerSaver: FileSaverService
  ) {
    this.form = this.fb.group({
      fecha_atencion: ['', Validators.required],
      jornada_atencion: ['', Validators.required],
      pedido: ['', Validators.required],
      regional: ['', Validators.required],
      documento_cliente: ['', Validators.required],
      contacto_cliente: ['', Validators.required],
      observacion_canal: ['', Validators.required],
      region: ['', Validators.required],
      documento_tecnico: [''],
      nombre_tecnico: [''],
      categoria: ['']
    });
    this.minDate = new Date();
  }

  ngOnInit(): void {

    if (localStorage.getItem('user') == null) {
      localStorage.clear();
      this.router.navigate(['login']);
    }
    this.login = localStorage.getItem('user');

    this.perfil = localStorage.getItem('perfil')


    if (this.perfil == '' && this.perfil == null) {
      this.router.navigate(['login'])
    }

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.observacionesDespacho();

    this.onWindowResize();
    this._MatPaginatorIntl.itemsPerPageLabel = 'Item por pagina';
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
            this.pedido
          ).pipe(catchError(res));
        }),
        map((empData) => {
          if (empData == null) return [];
          return empData;
        })
      )
      .subscribe((empData) => {
        this.ok = 0;
        this.error = 0;
        this.listPedido = empData.data;
        this.totalItems = empData.count
        this.dataSource = new MatTableDataSource(this.listPedido);
        for (let i = 0; i < this.listPedido.length; i++) {
          if (this.listPedido[i].tipificacion == 'Ok') {
            this.ok++;
          }
          if (this.listPedido[i].tipificacion == 'Rechazada') {
            this.error++;
          }

          if (this.listPedido[i].tipificacion == null) {
            this.pend++;
          }
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.getTableData$(1, 10, filterValue).subscribe(res => {
      this.dataSource = new MatTableDataSource(res.data);
      this.listPedido = res.data;
      this.ok = 0;
      this.error = 0;
      for (let i = 0; i < this.listPedido.length; i++) {
        if (this.listPedido[i].tipificacion == 'Ok') {
          this.ok++;
        }

        if (this.listPedido[i].tipificacion == 'Rechazada') {
          this.error++;
        }

        if (this.listPedido[i].tipificacion == null) {
          this.pend++;
        }
      }
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

  observacionesDespacho() {
    this._ventaInstale.observacionesDespacho().subscribe((data) => {
      this.countObservaciones = data.data.length;
      this.datosObervaciones = data.data
    })
  }

  verObservaciones() {

  }

  export() {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    this._ventaInstale.export(this.login).subscribe(res => {
      if (res.data) {
        const worksheet = XLSX.utils.json_to_sheet(res.data);

        const workbook = {
          Sheets: {
            'Historico': worksheet
          },
          SheetNames: ['Historico']

        }
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
        this.filerSaver.save(blobData, "Exporte")

      } else {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'El usuario no tiene datos para exportar',
        })
      }
    })

  }

  buscaPedidoVenta() {
    const pedido = this.form.value.pedido;
    if (!pedido) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un pedido',
      })
    } else {
      this._ventaInstale.buscaPedido(pedido)
        .subscribe((response) => {
          if (response.length) {
            if (response[0]['estado'] == 'Finalizada' || response[0]['estado'] == 'In Jeopardy' || response[0]['estado'] == 'Incompleto' || response[0]['estado'] == 'Pendiente' ||
              response[0]['estado'] == 'Rechazado' || response[0]['estado'] == 'Suspendido' || response[0]['estado'] == 'Suspendido-Abierto' || response[0]['estado'] == 'Cancelado') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El pedido esta en un estado no valido.',
              });
              return;
            }
            if (response[0]['UNEDoNotDispatch'] == 0) {
              this.state = 1;
              this.form.patchValue({
                contacto_cliente: response[0]['contacto_cliente'],
                documento_cliente: response[0]['documento_cliente'],
                regional: response[0]['regional'],
                region: response[0]['region'],
                categoria: response[0]['categoria']
              });
            } else if (response[0]['UNEDoNotDispatch'] == -1) {
              this.state = 1;
              Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'Estado pedido no asignable (Amarillo) Debes completar la informacion manualmente',
              })
            }
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Oops...',
              text: 'Pedido no se encuentra en la base de datos',
            })
          }
        })
    }
  }

  validaTecnico() {
    const documento_tecnico = this.form.value.documento_tecnico;
    if (documento_tecnico == '') {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Digite un documento de identidad valido'
      })
    } else {
      this._ventaInstale.validaTecnico(documento_tecnico).subscribe(res => {

        if (res.state != 0) {
          this.state_tecnico = 1;
          this.form.patchValue({
            nombre_tecnico: res.data[0].nombre
          });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: res.msj,
          })
        }
      })
    }
  }

  registrar() {

    if (this.form.invalid) {
      return;
    }

    if (this.form.valid) {
      const pedido: VentasInstaleTienda = {
        fecha_atencion: this.form.value.fecha_atencion,
        jornada_atencion: this.form.value.jornada_atencion,
        pedido: this.form.value.pedido,
        regional: this.form.value.regional,
        documento_cliente: this.form.value.documento_cliente,
        contacto_cliente: this.form.value.contacto_cliente,
        observacion_canal: this.form.value.observacion_canal,
        login_despacho: this.login,
        nombre_tecnico: this.form.value.nombre_tecnico,
        documento_tecnico: this.form.value.documento_tecnico,
        categoria: this.form.value.categoria
      }

      if (pedido.documento_tecnico == '') {
        pedido.nombre_tecnico = ''
      }

      if (pedido.nombre_tecnico == '') {
        pedido.documento_tecnico = ''
      }

      this._ventaInstale.guardaPedido(pedido)
        .subscribe(res => {
          if (res.state != 0) {
            Swal.fire({
              icon: 'success',
              title: 'Muy Bien',
              text: res.msj,
              timer: 4000
            }).then(() => {
              this.form.reset();
              this.state = 0;
              this.state_tecnico = 0;
            })
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Oops...',
              text: res.msj,
            })
          }
        })
    }
  }

}
function res(err: any, caught: Observable<any>): ObservableInput<any> {
  throw new Error('Function not implemented.');
}

