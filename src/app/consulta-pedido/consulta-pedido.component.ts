import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ConsultaService } from '../shared/services/consulta.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatCardContent } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgIf, NgFor } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { HeaderComponent } from '../shared/header/header.component';


@Component({
    selector: 'app-consulta-pedido',
    templateUrl: './consulta-pedido.component.html',
    styleUrls: ['./consulta-pedido.component.css'],
    standalone: true,
    imports: [HeaderComponent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, NgIf, MatProgressSpinner, MatCardContent, MatTabGroup, MatTab, NgFor]
})


export class ConsultaPedidoComponent implements OnInit {
  loading = false;
  aparece = false;
  form: FormGroup;
  Dispatch!: string;
  validar = false;
  public datos: Array<any> = []
  Mensaje: any;
  primarydate: any;
  perfil: any

  constructor(private fb: FormBuilder, private consulta: ConsultaService, private router: Router) {
    this.form = this.fb.group({
      'Pedido': [''],
      'Cedula': ['']
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') == null) {
      localStorage.clear();
      this.router.navigate(['login'])
    }
  }
  buscar() {
    this.aparece = false;
    let pedido = this.form.get('Pedido')?.value;
    let cedula = this.form.get('Cedula')?.value;
    this.loading = true;
    if (pedido == '') {
      pedido = 'vacio';
    }
    if (cedula == '') {
      cedula = 'vacio'
    }

    if (cedula == 'vacio' && pedido == 'vacio') {
      this.loading = false;
      this.validar = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingresa al menos un dato',
      })
    } else {
      this.validar = false;
    }
    this.consulta.consultaVisitasTerreno(pedido, cedula).subscribe(res => {
      if (res == null || res == '') {
        this.aparece = false
        this.loading = false;
        if (this.validar == false) {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'No se encuentra en la base de datos',
          })
        }

      } else {
        this.loading = false;
        for (let i = 0; i < res.length; i++) {
          if (res[i].EstadoPedido == '-1') {
            this.Dispatch = '*Pedido amarillo';
            this.Mensaje = true;
          } else {
            this.Dispatch = 'Pedido OK';
          }
          this.aparece = true;
        }
        this.datos = res;
      }

    })

  }

}
