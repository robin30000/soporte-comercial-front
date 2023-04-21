import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VentasInstaleTienda } from 'src/app/interfaces/ventasInstale';
import { VentaInstaleService } from 'src/app/services/venta-instale.service';
import Swal from 'sweetalert2';


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

  jornada: any[] =[
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
  perfil :any;
  login :any;

  constructor(private fb: FormBuilder, private _ventaInstale: VentaInstaleService, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      fecha_atencion: ['', Validators.required],
      jornada_atencion: ['', Validators.required],
      pedido: ['', Validators.required],
      regional: ['', Validators.required],
      documento_cliente: ['', Validators.required],
      contacto_cliente: ['', Validators.required],
      observacion_canal: ['', Validators.required],
    })

  }

  ngOnInit(): void {

    if(localStorage.getItem('user')==null){
      localStorage.clear();
      this.router.navigate(['login']);
    }
    this.login = localStorage.getItem('user');

    this.perfil  = localStorage.getItem('perfil')
    if(this.perfil != 1 && this.perfil == 2){
      this.router.navigate(['Ventas'])
    }

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.onWindowResize();

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

  buscaPedidoVenta() {
    const pedido = this.form.value.pedido;
    this._ventaInstale.buscaPedido(pedido)
      .subscribe((response) => {
        this.datos = Object.values(response);
        console.log(this.datos[0])
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
          if (this.datos[0] != 0) {
            this.form.reset();
            Swal.fire({
              icon: 'success',
              title: 'Muy Bien',
              text: 'La solicitud se realizo exitosamente',
              timer: 4000
            }).then(() => {
              this.router.navigate(["/ventas-instale-tiendas"]);
              this.form.reset();
            })
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Oops...',
              text: 'Ha ocurrido un error interno intentalo nuevamente en unos minutos',
            })
          }
        })
    }
  }

}
