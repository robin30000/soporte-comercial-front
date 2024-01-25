import { ConsultaEquiposInstaladosComponent } from "./components/consulta-equipos-instalados/consulta-equipos-instalados.component";
import { ConsultaPedidoComponent } from "./components/consulta-pedido/consulta-pedido.component";
import { CrearUsuarioComponent } from "./components/crear-usuario/crear-usuario.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilMenuComponent } from "./components/perfil-menu/perfil-menu.component";
import { Routes } from "@angular/router";
import { VentasComponent } from "./components/ventas/ventas.component";
import { VentasInstaleTiendasComponent } from "./components/ventas-instale-tiendas/ventas-instale-tiendas.component";


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'ConsultaPedido', component: ConsultaPedidoComponent },
    {
      path: 'ConsultaEquiposInstalados',
      component: ConsultaEquiposInstaladosComponent,
    },
    { path: 'Gescom', component: VentasComponent },
    { path: 'ventas-instale-tiendas', component: VentasInstaleTiendasComponent },
    { path: 'crear-usuario', component: CrearUsuarioComponent },
    { path: 'perfil-menu', component: PerfilMenuComponent },
    {
      path: '**',
      redirectTo: 'login',
      pathMatch: 'full',
    },
  ];