import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { BitcoinAverageService } from './service/bitcoinAverage-service';
import { ChartsModule } from 'ng2-charts';
import { AssinaturaService } from './service/assinatura-service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    BitcoinAverageService,
    AssinaturaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
