import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaPedidoComponent } from './consulta-pedido/consulta-pedido.component';

const routes: Routes = [
  {path:'',redirectTo:'ConsultaPedido',pathMatch:'full'},
  {path:'ConsultaPedido',component:ConsultaPedidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
