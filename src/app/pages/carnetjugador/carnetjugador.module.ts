import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarnetjugadorPageRoutingModule } from './carnetjugador-routing.module';

import { CarnetjugadorPage } from './carnetjugador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarnetjugadorPageRoutingModule
  ],
  declarations: [CarnetjugadorPage]
})
export class CarnetjugadorPageModule {}
