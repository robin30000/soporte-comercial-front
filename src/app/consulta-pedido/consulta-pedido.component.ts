import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaService } from '../services/consulta.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


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
  Mensaje: any;

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
  }
  buscar(){
    this.aparece=false;
    let pedido=this.form.get('Pedido')?.value;
    let cedula=this.form.get('Cedula')?.value;
    this.loading=true;
    if(pedido == ''){
      pedido= 'vacio';
    }
    if(cedula==''){
      cedula='vacio'
    }
    
    if(cedula=='vacio'&& pedido=='vacio'){
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

    this.consulta.consultaVisitasTerreno(pedido,cedula).subscribe(res=>{
      console.log(res);
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
        if(res[0].EstadoPedido=='-1'){
          this.Dispatch='*Pedido amarillo';
          this.Mensaje = true;
        }else{
          this.Dispatch='Pedido OK';
        }
        this.aparece=true;
        this.datos=res;
      }
    
    })

  }

}
