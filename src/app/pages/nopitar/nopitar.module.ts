import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NopitarPageRoutingModule } from './nopitar-routing.module';

import { NopitarPage } from './nopitar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NopitarPageRoutingModule
  ],
  declarations: [NopitarPage]
})
export class NopitarPageModule {}
