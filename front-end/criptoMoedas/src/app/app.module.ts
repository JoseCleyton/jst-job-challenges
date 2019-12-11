import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { BitcoinAverageService } from './service/bitcoinAverage-service';
import { ChartsModule } from 'ng2-charts';
import { AssinaturaService } from './service/assinatura-service';
import { ListaSiglasComponent } from './lista-siglas/lista-siglas.component';
import { ROUTES } from './routers/app-routes';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    ListaSiglasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    BitcoinAverageService,
    AssinaturaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
