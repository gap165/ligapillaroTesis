import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroArbiPageRoutingModule } from './registro-arbi-routing.module';

import { RegistroArbiPage } from './registro-arbi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroArbiPageRoutingModule
  ],
  declarations: [RegistroArbiPage]
})
export class RegistroArbiPageModule {}
