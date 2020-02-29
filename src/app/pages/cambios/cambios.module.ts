import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiosPageRoutingModule } from './cambios-routing.module';

import { CambiosPage } from './cambios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiosPageRoutingModule
  ],
  declarations: [CambiosPage]
})
export class CambiosPageModule {}
