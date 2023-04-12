import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaService } from '../services/consulta.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  loading= false;
  aparece=false;
  form: FormGroup;
  Guion!: string;
  validar=false;
  public datos:Array<any>=[]
  Mensaje: any;
  primarydate: any;
  perfil: any;
  

  constructor(private fb: FormBuilder, private consulta:ConsultaService,private router:Router,private alerts: MatSnackBar) { 
    this.form=this.fb.group({
      'Pedido':[''],
      'Cedula':['']
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem('user')==null){
      localStorage.clear();
      this.router.navigate(['login'])
    }
    this.perfil  = localStorage.getItem('perfil')

    if(this.perfil != 2 && this.perfil == 1){
      this.router.navigate(['ConsultaPedido'])
    }
  }
  buscar(){
    this.aparece=false;
    let pedido=this.form.get('Pedido')?.value;
    this.loading=true;
    if(pedido == ''){
      pedido= 'vacio';
    }
    if(pedido=='vacio'){
      this.loading=false;
      this.validar=true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingresa al menos un dato',
      })
    }else{
      this.validar=false;
    }

    this.consulta.consultaVisitasTerreno(pedido,'vacio').subscribe(res=>{
      console.log(res);
      let Estado = res[0]['Name'];
      if(res==null ||res==''){
        this.aparece=false
        this.loading=false;
        if(this.validar==false){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'No se encuentra en la base de datos',
          })
        }

      }else{
        this.loading=false;
        this.aparece=true;
        let date = new Date()
        let fecha = date.toISOString().split('T')[0]
        console.log(res[0]['FechaCita'])

        if(res[0]['FechaCita'] > fecha){
          Estado = "Agenda Futura"
          res[0]['Name'] = "Agenda Futura"
        }

        if(Estado == 'En Sitio'){
            this.Guion = "Nuestro personal técnico ya se encuentra en el domicilio realizando la instalación, el técnico que se encuentra prestando el servicio es: "+ res[0]['NombreTecnico']+" con Cedula: "+ res[0]['CedulaTecnico'] 
        }else if (Estado == 'Abierto'){
          this.Guion = "Tu orden con pedido XXX tiene fecha de instalación "+ res[0]['FechaCita']+" en horario "+ res[0]['HoraCita']+ ", esta próximo por ser asignado, recuerda contarle al usuario que debe permanecer un mayor de edad y contar con los equipos disponibles para la instalación"
        }else if(Estado=='Asignado'){
          this.Guion = "Tu orden con pedido "+ res[0]['Pedido'] +" tiene fecha de instalación"+ res[0]['FechaCita']+ " en horario "+res[0]['HoraCita']+", ya cuenta con un técnico, asignado, recuerda contarle al usuario que debe permanecer un mayor de edad y contar con los equipos disponibles para la instalación."
        }else if(Estado== 'Despachado'){
          this.Guion = "Tu orden con pedido "+ res[0]['Pedido'] +" tiene fecha de instalación"+ res[0]['FechaCita']+ " en horario "+res[0]['HoraCita']+", ya cuenta con un técnico, asignado, recuerda contarle al usuario que debe permanecer un mayor de edad y contar con los equipos disponibles para la instalación."
        }
        else if(Estado == 'En Camino'){
          this.Guion = "Tu orden con pedido "+ res[0]['Pedido'] +" tiene fecha de instalación"+ res[0]['FechaCita']+ " en horario "+res[0]['HoraCita']+" ya cuenta con un técnico, asignado y se dirige a la dirección, recuerda contarle al usuario que debe permanecer un mayor de edad y contar con los equipos disponibles para la instalación."
        }
        else if(Estado == 'Finalizada'){
          this.Guion = "Nuestro personal técnico ya realizó la instalación satisfactoriamente."
        }
        else if(Estado == 'Incompleto'){
          this.Guion = "Lastimosamente no hemos logrado realizar el 100% de la instalación, el pedido "+ res[0]['Pedido'] +" se encuentra pendiente y estamos realizando la gestión necesaria para cumplir la orden."
        }
        else if(Estado == 'Pendiente'){
          this.Guion = "Lastimosamente no hemos logrado realizar de la instalación, el pedido "+ res[0]['Pedido'] +" se encuentra pendiente y estamos realizando la gestión necesaria para cumplir la orden."
        }
        else if(Estado == 'Cancelado'){
          this.Guion = "El pedido "+ res[0]['Pedido']+ " ha sido cancelado, por tal motivo lamentamos informarte que es necesario nuevamente contactar al cliente y realizarle la gestión comercial"
        }
        else if(Estado == 'Suspendido'){
          this.Guion = "El pedido "+ res[0]['Pedido']+ " se ha asociado a una falla masiva, sugerimos que contactes al cliente para infórmale la situación."
        }
        else if(Estado == 'Incompleto gestionable'){
          this.Guion = ""
        }
        else if(Estado == 'Agenda Futura'){
          this.Guion = "Tu orden con pedido "+ res[0]['Pedido']+", no se encuentra en ruta para el día de hoy, su fecha de instalación es el "+ res[0]['FechaCita'] +" en horario "+ res[0]['HoraCita']
        }else{
          this.Guion = "Estado desconocido"
        }
        this.datos=res;
      }
    
    })

  }

}
