import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, count, map, merge, Observable, ObservableInput, startWith, switchMap } from 'rxjs';
import { VentasInstaleTienda } from 'src/app/interfaces/ventasInstale';
import { VentaInstaleService } from 'src/app/services/venta-instale.service';
import Swal from 'sweetalert2';
import { MatTableModule } from '@angular/material/table';

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
    'Andina',
    'Norte',
    'Sur',
    'Centro'
  ];

  jornada: any[] = [
    'AM',
    'Masivo',
    'TD'
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
  public perfil: any;
  public login: any;
  public state_tecnico: number = 0;
  public minDate: Date;
  public countObservaciones: number = 0;
  public datosObervaciones: any;


  dataSource = new MatTableDataSource<RespuestaPedidoVenta>;
  displayedColumns: string[] = ['pedido', 'observacion_gestion', 'tipificacion', 'obs_tipificacion', 'fecha_gestion'];

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
    private _MatPaginatorIntl: MatPaginatorIntl
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
      categoria:['']
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
    if (this.perfil != 3 && this.perfil == 2) {
      this.router.navigate(['Ventas'])
    }
    if (this.perfil != 3 && this.perfil == 1) {
      this.router.navigate(['ConsultaPedido'])
    }

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
          } else {
            this.error++;
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
        } else {
          this.error++;
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
          if (response[0]['contacto_cliente']) {
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

