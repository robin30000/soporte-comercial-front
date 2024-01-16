import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaService } from '../services/consulta.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
})
export class VentasComponent implements OnInit {
  loading = false;
  aparece = false;
  observe = false;
  Observacion!: string;
  form: FormGroup;
  Guion!: string;
  validar = false;
  public datos: Array<any> = [];
  Mensaje: any;
  primarydate: any;
  perfil: any;
  supervisor: any;
  aparece1: boolean = false;
  EstadoPedido: boolean = false;
  MicroZona: boolean = false;

  constructor(
    private fb: FormBuilder,
    private consulta: ConsultaService,
    private router: Router,
    private alerts: MatSnackBar
  ) {
    this.form = this.fb.group({
      Pedido: [''],
      Cedula: [''],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') == null) {
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }
  buscar() {
    this.aparece = false;
    let pedido = this.form.get('Pedido')?.value;
    this.loading = true;
    if (pedido == '') {
      pedido = 'vacio';
    }
    if (pedido == 'vacio') {
      this.loading = false;
      this.validar = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingresa al menos un dato',
      });
    } else {
      this.validar = false;
    }

    this.consulta.consultaVisitasTerreno(pedido, 'vacio').subscribe((res) => {
      console.log(res, 'RROOO');

      let Estado = res[0]['Name'];
      if (res == null || res == '') {
        this.aparece = false;
        this.loading = false;
        if (this.validar == false) {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'No se encuentra en la base de datos',
          });
        }
      } else {
        this.loading = false;
        this.aparece = true;

        let date = new Date();
        let fecha = date.toISOString().split('T')[0];

        if (
          res[0]['FechaCita'] > fecha &&
          (Estado == 'Abierto' || Estado == 'Asignado')
        ) {
          Estado = 'Agenda Futura';
          res[0]['Name'] = 'Agenda Futura';
        } else if (res[0]['FechaCita'] < fecha) {
          Estado = 'Agenda Vencida';
          res[0]['Name'] = 'Agenda Vencida';
        }

        if (res[0]['EstadoPedido'] === -1) {
          this.EstadoPedido = true;
        }

        if (res[0]['MicroZona']) {
          this.MicroZona = true;
        }

        if (Estado == 'Incompleto') {
          this.observe = true;
          this.consulta.consultaIncompleto(pedido).subscribe((res1) => {
            let IncompleteCode = res1[0]['IncompleteCode'];
            let concepto = res1[0]['Concepto'];
            if (res1[0]['ObsTecnico'] == '' || res1[0]['ObsTecnico'] == null) {
              this.Observacion =
                'Para este pedido el tecnico no registro observaciones';
            } else {
              this.Observacion = res1[0]['ObsTecnico'];
            }

            if (
              IncompleteCode == 'S-Aprovisionamiento-OT-C01' ||
              IncompleteCode == 'POE-Aprovisionamiento BSC-OT-C01' ||
              IncompleteCode == 'S-Aprovisionamiento-OT-C02' ||
              IncompleteCode == 'POE-Aprovisionamiento BSC-OT-C02' ||
              IncompleteCode == 'S-Aprovisionamiento-OT-C06' ||
              IncompleteCode == 'POE-Aprovisionamiento BSC-OT-C06' ||
              IncompleteCode == 'S-Aprovisionamiento-OT-C07' ||
              IncompleteCode == 'POE-Aprovisionamiento BSC-OT-C07' ||
              IncompleteCode == 'S-Aprovisionamiento-OT-C08' ||
              IncompleteCode == 'S-Aprovisionamiento-OT-C12' ||
              IncompleteCode == 'POE-Aprovisionamiento BSC-OT-C12' ||
              IncompleteCode == 'S-Aprovisionamiento-OT-C14' ||
              IncompleteCode == 'POE-Aprovisionamiento BSC-OT-C14' ||
              IncompleteCode == 'S-Aprovisionamiento-OT-C17' ||
              IncompleteCode == 'POE-Aprovisionamiento BSC-OT-C17' ||
              IncompleteCode == 'S-Aprovisionamiento-OT-C20' ||
              IncompleteCode == 'POE-Aprovisionamiento BSC-OT-C20' ||
              IncompleteCode == 'E-Aprovisionamiento B2B-O-02' ||
              IncompleteCode == 'E-Aprovisionamiento B2B-O-08' ||
              IncompleteCode == 'E-Aprovisionamiento B2B-O-101' ||
              IncompleteCode == 'E-Aprovisionamiento B2B-O-23' ||
              IncompleteCode == 'E-Aprovisionamiento B2B-O-49' ||
              IncompleteCode == 'E-Aprovisionamiento B2B-O-50' ||
              IncompleteCode == 'E-Aprovisionamiento B2B-O-53' ||
              IncompleteCode == 'E-Corte-O-04' ||
              IncompleteCode == 'E-Corte-O-07' ||
              IncompleteCode == 'E-Recuperacion de Equipos-O-49' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1019' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1020' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1025' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1026' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1028' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1030' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1209' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1216' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1505' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1506' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1507' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1508' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1510' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1511' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1516' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-1517' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-2182' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-2898' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-3014' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-3087' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-3091' ||
              IncompleteCode == 'ETP-Aprovisionamiento B2B-3092' ||
              IncompleteCode == 'ETP-Aseguramiento B2B-1071' ||
              IncompleteCode == 'ETP-Aseguramiento B2B-1072' ||
              IncompleteCode == 'ETP-Aseguramiento B2B-2985' ||
              IncompleteCode == 'ETP-Recuperacion de Equipos-1026' ||
              IncompleteCode == 'ETP-Recuperacion de Equipos-1505' ||
              IncompleteCode == 'ETP-Recuperacion de Equipos-1510' ||
              IncompleteCode == 'ETP-Recuperacion de Equipos-8385' ||
              IncompleteCode == 'F-Aprovisionamiento B2B-O-02' ||
              IncompleteCode == 'F-Aprovisionamiento B2B-O-08' ||
              IncompleteCode == 'F-Aprovisionamiento B2B-O-103' ||
              IncompleteCode == 'F-Aprovisionamiento B2B-O-23' ||
              IncompleteCode == 'F-Aprovisionamiento B2B-O-49' ||
              IncompleteCode == 'F-Aprovisionamiento B2B-O-50' ||
              IncompleteCode == 'F-Aprovisionamiento B2B-O-53' ||
              IncompleteCode == 'F-Corte-O-07' ||
              IncompleteCode == 'F-Recuperacion de Equipos-O-49' ||
              IncompleteCode == 'F-Recuperacion de Equipos-O-70' ||
              IncompleteCode == 'F-Recuperacion de Equipos-PEISI' ||
              IncompleteCode == 'E-Aseguramiento-O-65' ||
              IncompleteCode == 'E-Aseguramiento-PENDI' ||
              IncompleteCode == 'E-Aseguramiento-PROG' ||
              IncompleteCode == 'EDA-Aprovisionamiento-67' ||
              IncompleteCode == 'EDA-Aprovisionamiento-214' ||
              IncompleteCode == 'EDA-Aprovisionamiento-219' ||
              IncompleteCode == 'EDA-Aprovisionamiento-223' ||
              IncompleteCode == 'EDA-Aprovisionamiento-234' ||
              IncompleteCode == 'EDA-Aprovisionamiento-600' ||
              IncompleteCode == 'EDA-Aprovisionamiento-1528' ||
              IncompleteCode == 'EDA-Aprovisionamiento-9446' ||
              IncompleteCode == 'EDA-Aprovisionamiento-9486' ||
              IncompleteCode == 'EDA-Aprovisionamiento-9726' ||
              IncompleteCode == 'EDA-Aprovisionamiento-9967' ||
              IncompleteCode == 'EDA-Aseguramiento-468' ||
              IncompleteCode == 'EDA-Aseguramiento-466' ||
              IncompleteCode == 'EDA-Aprovisionamiento-9314' ||
              IncompleteCode == 'EDA-Aprovisionamiento-9313' ||
              IncompleteCode == 'EDA-Aseguramiento-9822' ||
              IncompleteCode == 'EDA-Aseguramiento-9312' ||
              IncompleteCode == 'ETP-Aprovisionamiento BSC-1516' ||
              IncompleteCode == 'ETP-Aprovisionamiento BSC-1517'
            ) {
              res[0]['Name'] = 'Incompleto gestionable';
              this.Guion =
                'Lastimosamente no fue posible realizar el 100% de la instalación del pedido ' +
                pedido +
                ', el cual quedo en concepto ' +
                concepto +
                ', es necesario que nuevamente contactes al cliente y realizarle la gestión comercial.';
            } else if (IncompleteCode == '' || IncompleteCode == null) {
              this.Guion =
                'Se presento un error en Click, este pedido debe ser gestionado nuevamente';
            } else {
              this.Guion =
                'Lastimosamente no hemos logrado realizar el 100% de la instalación, el pedido ' +
                pedido +
                ' se encuentra pendiente y estamos realizando la gestión necesaria para cumplir la orden.';
            }
          });
        }

        if (Estado == 'En Sitio') {
          this.Guion =
            'Nuestro personal técnico ya se encuentra en el domicilio realizando la instalación, el técnico que se encuentra prestando el servicio es: ' +
            res[0]['NombreTecnico'] +
            ' con Cedula: ' +
            res[0]['CedulaTecnico'];
        } else if (Estado == 'Abierto') {
          this.Guion =
            'Tu orden con pedido' +
            pedido +
            ' tiene fecha de instalación ' +
            res[0]['FechaCita'] +
            ' en horario ' +
            res[0]['HoraCita'] +
            ', esta próximo por ser asignado, recuerda contarle al usuario que debe permanecer un mayor de edad y contar con los equipos disponibles para la instalación';
        } else if (Estado == 'Asignado') {
          this.Guion =
            'Tu orden con pedido ' +
            pedido +
            ' tiene fecha de instalación ' +
            res[0]['FechaCita'] +
            ' en horario ' +
            res[0]['HoraCita'] +
            ', ya cuenta con un técnico, asignado, recuerda contarle al usuario que debe permanecer un mayor de edad y contar con los equipos disponibles para la instalación.';
        } else if (Estado == 'Despachado') {
          this.Guion =
            'Tu orden con pedido ' +
            pedido +
            ' tiene fecha de instalación ' +
            res[0]['FechaCita'] +
            ' en horario ' +
            res[0]['HoraCita'] +
            ', ya cuenta con un técnico, asignado, recuerda contarle al usuario que debe permanecer un mayor de edad y contar con los equipos disponibles para la instalación.';
        } else if (Estado == 'En Camino') {
          this.Guion =
            'Tu orden con pedido ' +
            pedido +
            ' tiene fecha de instalación ' +
            res[0]['FechaCita'] +
            ' en horario ' +
            res[0]['HoraCita'] +
            ' ya cuenta con un técnico, asignado y se dirige a la dirección, recuerda contarle al usuario que debe permanecer un mayor de edad y contar con los equipos disponibles para la instalación.';
        } else if (Estado == 'Finalizada') {
          this.Guion =
            'Nuestro personal técnico ya realizó la instalación satisfactoriamente.';
        } else if (Estado == 'Pendiente') {
          this.Guion =
            'Lastimosamente no hemos logrado realizar de la instalación, el pedido ' +
            pedido +
            ' se encuentra pendiente y estamos realizando la gestión necesaria para cumplir la orden.';
        } else if (Estado == 'Cancelado') {
          this.Guion =
            'El pedido ' +
            pedido +
            ' ha sido cancelado, por tal motivo lamentamos informarte que es necesario nuevamente contactar al cliente y realizarle la gestión comercial';
        } else if (Estado == 'Suspendido') {
          this.Guion =
            'El pedido ' +
            pedido +
            ' se ha asociado a una falla masiva, sugerimos que contactes al cliente para infórmale la situación.';
        } else if (Estado == 'Agenda Futura') {
          this.Guion =
            'Tu orden con pedido ' +
            pedido +
            ', no se encuentra en ruta para el día de hoy, su fecha de instalación es el ' +
            res[0]['FechaCita'] +
            ' en horario ' +
            res[0]['HoraCita'];
        } else if (Estado == 'Agenda Vencida') {
          this.Guion = 'El pedido tiene FechaCita vencida';
        } else {
          this.Guion = 'Estado desconocido';
        }

        if (res[0]['NombreTecnico'] != null) {
          this.consulta
            .consultaSupervisor(res[0]['CedulaTecnico'])
            .subscribe((res) => {
              this.aparece1 = true;
              this.supervisor = res;
            });
        }

        this.datos = res;
      }
    });
  }
}
