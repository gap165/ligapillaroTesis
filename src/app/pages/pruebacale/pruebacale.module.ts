import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule  } from '@ionic/angular';
import { RouterModule } from '@angular/router';


import { PruebacalePageRoutingModule } from './pruebacale-routing.module';

import { PruebacalePage } from './pruebacale.page';

import { CalendarModule } from 'ion2-calendar';


@NgModule({
  declarations: [PruebacalePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebacalePageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: PruebacalePage
      }
    ]),
    CalendarModule
  ],
  entryComponents : [
    PruebacalePage,
  ]
})
export class PruebacalePageModule {}
