import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaService } from '../services/consulta.service';
import{ MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

export interface Tecnico{
  CedulaTecnico : string
  NombreTecnico:string
}
let Tecnicos:Tecnico[]
export interface Cliente{
  CedulaCliente:string
  NombreCliente:string
  DireccionCliente:string
}
let Clientes:Cliente[]
export interface Pedido{
  Estado:string
  Pedido:string
  FechaCita:string
  HoraCita:string
  UEN:string
  Segmento:string
  Productos:string
  Tecnologias:string
  MicroZona:string
}
let Pedidos:Pedido[]

@Component({
  selector: 'app-consulta-pedido',
  templateUrl: './consulta-pedido.component.html',
  styleUrls: ['./consulta-pedido.component.css']
})


export class ConsultaPedidoComponent implements OnInit {
  loading= false;
  aparece=false;
  form: FormGroup;
  Dispatch!: string;
  validar=false;
  public datos:Array<any>=[]
  constructor(private fb: FormBuilder, private consulta:ConsultaService) { 
    this.form=this.fb.group({
      'Pedido':[''],
      'Cedula':['']
    })
  }

  ngOnInit(): void {
  }
  buscar(){
    let pedido=this.form.get('Pedido')?.value;
    let cedula=this.form.get('Cedula')?.value;

    if(pedido == ''){
      pedido= 'vacio';
    }
    if(cedula==''){
      cedula='vacio'
    }
    
    if(cedula=='vacio'&& pedido=='vacio'){
      this.validar=true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingresa al menos un dato',
      })
    }else{
      this.validar=false;
    }

    this.consulta.consulta(pedido,cedula).subscribe(res=>{
      if(res==null ||res==''){
        this.aparece=false

        if(this.validar==false){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'No se encuentra en la base de datos',
          })
        }

      }else{

        if(res[0].EstadoPedido=='-1'){
          this.Dispatch='El pedido no tiene la informacion completa en Click';
        
        }else{
          this.Dispatch='Pedido OK';
        }
        this.aparece=true;
        this.datos=res;
      }
    
    })

  }

}
