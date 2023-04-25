import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, count, map, merge, Observable, ObservableInput, startWith, switchMap } from 'rxjs';
import { VentasInstaleTienda } from 'src/app/interfaces/ventasInstale';
import { VentaInstaleService } from 'src/app/services/venta-instale.service';
import Swal from 'sweetalert2';


export interface RespuestaPedidoVenta {
  pedido: number,
  observacion_gestion: string,
  tipificacion: string,
  obs_tipificacion: string,
  fecha_gestion: Date
}

@Component({
  selector: 'app-ventas-instale-tiendas',
  templateUrl: './ventas-instale-tiendas.component.html',
  styleUrls: ['./ventas-instale-tiendas.component.css']
})

export class VentasInstaleTiendasComponent implements OnInit {

  region: any[] = [
    'Noroccidente',
    'Norte',
    'Sur',
    'Centro'
  ];

  jornada: any[] = [
    'AM',
    'PM',
    'TD'
  ]

  form: FormGroup;
  public datos: Array<any> = [];
  public getScreenWidth: any;
  public getScreenHeight: any;
  public desired_columns: any;
  public state: number = 0;
  public ok: number = 0;
  public error: number = 0;
  perfil: any;
  login: any;

  totalData: number = 0;


  dataSource = new MatTableDataSource<RespuestaPedidoVenta>;
  displayedColumns: string[] = ['pedido', 'observacion_gestion', 'tipificacion', 'obs_tipificacion', 'fecha_gestion'];

  totalItems = 0;
  pageSize = 10;
  listPedido: RespuestaPedidoVenta[] = [];

  getTableData$(pageNumber: Number, pageSize: Number) {
    return this._ventaInstale.respuestasPedidos(pageNumber, pageSize, this.login);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private _ventaInstale: VentaInstaleService, private router: Router, private _MatPaginatorIntl: MatPaginatorIntl) {
    this.form = this.fb.group({
      fecha_atencion: ['', Validators.required],
      jornada_atencion: ['', Validators.required],
      pedido: ['', Validators.required],
      regional: ['', Validators.required],
      documento_cliente: ['', Validators.required],
      contacto_cliente: ['', Validators.required],
      observacion_canal: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    if (localStorage.getItem('user') == null) {
      localStorage.clear();
      this.router.navigate(['login']);
    }
    this.login = localStorage.getItem('user');

    this.perfil = localStorage.getItem('perfil')
    if (this.perfil != 1 && this.perfil == 2) {
      this.router.navigate(['Ventas'])
    }

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

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
            this.paginator.pageSize
          ).pipe(catchError(res));
        }),
        map((empData) => {
          if (empData == null) return [];
          this.totalData = empData.count;
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
          } else {
            this.error++;
          }
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  buscaPedidoVenta() {
    const pedido = this.form.value.pedido;
    this._ventaInstale.buscaPedido(pedido)
      .subscribe((response) => {
        this.datos = Object.values(response);
        if (this.datos[0] != 0) {
          this.state = 1;
          this.form.patchValue({
            contacto_cliente: response.data.contacto_cliente,
            documento_cliente: response.data.documento_cliente,
            regional: response.data.regional
          });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Pedido no se encuentra en la base de datos',
          })
        }
      })
  }

  registrar() {
    if (this.form.valid) {
      const pedido: VentasInstaleTienda = {
        fecha_atencion: this.form.value.fecha_atencion,
        jornada_atencion: this.form.value.jornada_atencion,
        pedido: this.form.value.pedido,
        regional: this.form.value.regional,
        documento_cliente: this.form.value.documento_cliente,
        contacto_cliente: this.form.value.contacto_cliente,
        observacion_canal: this.form.value.observacion_canal,
        login_despacho: this.login
      }

      this._ventaInstale.guardaPedido(pedido)
        .subscribe(res => {
          this.datos = Object.values(res);
          console.log(res);
          
          if (this.datos[0] != 0) {

            Swal.fire({
              icon: 'success',
              title: 'Muy Bien',
              text: res.msj,
              timer: 4000
            }).then(() => {
              this.form.reset();
              this.state = 0;
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

