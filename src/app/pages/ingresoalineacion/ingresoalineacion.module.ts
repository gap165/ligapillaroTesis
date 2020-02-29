import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoalineacionPageRoutingModule } from './ingresoalineacion-routing.module';

import { IngresoalineacionPage } from './ingresoalineacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoalineacionPageRoutingModule
  ],
  declarations: [IngresoalineacionPage]
})
export class IngresoalineacionPageModule {}
