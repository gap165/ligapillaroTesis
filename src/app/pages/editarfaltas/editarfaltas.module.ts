import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarfaltasPageRoutingModule } from './editarfaltas-routing.module';

import { EditarfaltasPage } from './editarfaltas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarfaltasPageRoutingModule
  ],
  declarations: [EditarfaltasPage]
})
export class EditarfaltasPageModule {}
