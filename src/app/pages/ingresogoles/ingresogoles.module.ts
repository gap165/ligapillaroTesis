import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresogolesPageRoutingModule } from './ingresogoles-routing.module';

import { IngresogolesPage } from './ingresogoles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresogolesPageRoutingModule
  ],
  declarations: [IngresogolesPage]
})
export class IngresogolesPageModule {}
