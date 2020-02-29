import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoinformePageRoutingModule } from './ingresoinforme-routing.module';

import { IngresoinformePage } from './ingresoinforme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoinformePageRoutingModule
  ],
  declarations: [IngresoinformePage]
})
export class IngresoinformePageModule {}
