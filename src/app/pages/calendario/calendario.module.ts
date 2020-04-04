import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';

import {CalendarModule} from 'ion2-calendar';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalendarioPage
      }
    ]),
    CalendarModule
  ],
  declarations: [CalendarioPage],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-MX'}
  ]

})
export class CalendarioPageModule {

}
