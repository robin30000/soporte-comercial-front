import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaEquiposInstaladosComponent } from './consulta-equipos-instalados/consulta-equipos-instalados.component';
import { ConsultaPedidoComponent } from './consulta-pedido/consulta-pedido.component';

const routes: Routes = [
  {path:'',redirectTo:'ConsultaPedido',pathMatch:'full'},
  {path:'ConsultaPedido',component:ConsultaPedidoComponent},
  {path:'ConsultaEquiposInstalados',component:ConsultaEquiposInstaladosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
