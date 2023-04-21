import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaEquiposInstaladosComponent } from './consulta-equipos-instalados/consulta-equipos-instalados.component';
import { ConsultaPedidoComponent } from './consulta-pedido/consulta-pedido.component';
import { LoginComponent } from './login/login.component';
import { VentasComponent } from './ventas/ventas.component';
import { VentasInstaleTiendasComponent } from './components/ventas-instale-tiendas/ventas-instale-tiendas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'ConsultaPedido', component: ConsultaPedidoComponent },
  { path: 'ConsultaEquiposInstalados', component: ConsultaEquiposInstaladosComponent },
  { path: 'Ventas', component: VentasComponent },
  { path: 'ventas-instale-tiendas', component: VentasInstaleTiendasComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
