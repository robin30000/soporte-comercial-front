import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConsultaPedidoComponent } from './consulta-pedido/consulta-pedido.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConsultaEquiposInstaladosComponent } from './consulta-equipos-instalados/consulta-equipos-instalados.component';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatDividerModule } from '@angular/material/divider';

import { VentasComponent } from './ventas/ventas.component';
import { VentasInstaleTiendasComponent } from './components/ventas-instale-tiendas/ventas-instale-tiendas.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FileSaverModule } from 'ngx-filesaver';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { ModalCreaUsuarioComponent } from './components/crear-usuario/modal-crea-usuario/modal-crea-usuario.component';
import { PerfilMenuComponent } from './components/perfil-menu/perfil-menu.component';
import { ModalPerfilMenuComponent } from './components/perfil-menu/modal-perfil-menu/modal-perfil-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConsultaPedidoComponent,
    ConsultaEquiposInstaladosComponent,
    LoginComponent,
    VentasComponent,
    VentasInstaleTiendasComponent,
    CrearUsuarioComponent,
    ModalCreaUsuarioComponent,
    PerfilMenuComponent,
    ModalPerfilMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule,
    MatProgressBarModule,
    CdkAccordionModule,
    FileSaverModule,
    MatDividerModule,
  ],
  providers: [
    //{provide:LocationStrategy,useClass:HashLocationStrategy},
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
