import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ConsultaService } from '../shared/services/consulta.service';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgIf, NgFor } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
    selector: 'app-consulta-equipos-instalados',
    templateUrl: './consulta-equipos-instalados.component.html',
    styleUrls: ['./consulta-equipos-instalados.component.css'],
    standalone: true,
    imports: [HeaderComponent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, NgIf, MatProgressSpinner, NgFor]
})
export class ConsultaEquiposInstaladosComponent implements OnInit {
  loading = false;
  form: FormGroup;
  aparece = false;
  validar = false;
  install = false;
  repair = false;
  traslado = false;
  collect = false;
  dataCollect: any[] = []
  dataTralado: any[] = []
  dataRepair: any[] = []
  dataInstall: any[] = []
  perfil: any;
  constructor(private fb: FormBuilder, private consulta: ConsultaService, private router: Router) {
    this.form = this.fb.group({
      'Pedido': [''],
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
    this.loading = true;
    if (pedido == '') {
      this.validar = true;
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingresa un dato',
      })
      return;
    } else {
      this.validar = false;
    }


    this.consulta.consultaEquiposInstalados(pedido).subscribe(res => {
      if (res == null || res == '') {
        this.aparece = false
        this.loading = false;
        if (this.validar == false) {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Pedido no se encuentra en la base de datos',
          })
        }

      } else {

        for (let i = 0; i < res.length; i++) {
          this.loading = false;
          this.aparece = true;

          if (res[i].TIPOPETICION == 'Install') {
            this.install = true;
            this.dataInstall = this.dataInstall.concat(res[i])
          } else if (this.dataInstall == null) {
            this.install = false;
          } if (res[i].TIPOPETICION == 'Repair') {
            this.repair = true;
            this.dataRepair = this.dataRepair.concat(res[i])
          } else if (this.dataRepair == null) {
            this.repair = false;
          } if (res[i].TIPOPETICION == 'Traslado') {
            this.traslado = true;
            this.dataTralado = this.dataTralado.concat(res[i])
          } else if (this.dataTralado == null) {
            this.traslado = false;
          } if (res[i].TIPOPETICION == 'Collect') {
            this.collect = true;
            this.dataCollect = this.dataCollect.concat(res[i])
          } else if (this.dataCollect == null) {
            this.collect = false;
          }
        }
      }
    })
    this.dataInstall = []
    this.dataRepair = []
    this.dataTralado = []
    this.dataCollect = []
    this.aparece = false;
    this.validar = false;
    this.install = false;
    this.repair = false;
    this.traslado = false;
    this.collect = false;
  }

}
