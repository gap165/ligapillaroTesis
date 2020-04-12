import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


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
    {provide: LOCALE_ID, useValue: '	zh-CN' }
  ]

})
export class CalendarioPageModule {

}
