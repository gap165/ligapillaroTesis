import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PartidosPageRoutingModule } from './partidos-routing.module';
import { PartidosPage } from './partidos.page';

/* MODULO DE CALENDARIO */
import {CalendarModule} from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartidosPageRoutingModule,
    CalendarModule
  ],
  declarations: [PartidosPage]
})
export class PartidosPageModule {}
