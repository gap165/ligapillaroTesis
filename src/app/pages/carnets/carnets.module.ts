import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarnetsPageRoutingModule } from './carnets-routing.module';

import { CarnetsPage } from './carnets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarnetsPageRoutingModule
  ],
  declarations: [CarnetsPage]
})
export class CarnetsPageModule {}
