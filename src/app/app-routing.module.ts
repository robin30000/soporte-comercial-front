import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaEquiposInstaladosComponent } from './consulta-equipos-instalados/consulta-equipos-instalados.component';
import { ConsultaPedidoComponent } from './consulta-pedido/consulta-pedido.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'ConsultaPedido',component:ConsultaPedidoComponent},
  {path:'ConsultaEquiposInstalados',component:ConsultaEquiposInstaladosComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]

})
export class AppRoutingModule { }
