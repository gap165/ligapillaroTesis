import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaposicionesPageRoutingModule } from './tablaposiciones-routing.module';

import { TablaposicionesPage } from './tablaposiciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablaposicionesPageRoutingModule
  ],
  declarations: [TablaposicionesPage]
})
export class TablaposicionesPageModule {}
