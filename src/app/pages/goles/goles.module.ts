import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GolesPageRoutingModule } from './goles-routing.module';

import { GolesPage } from './goles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GolesPageRoutingModule
  ],
  declarations: [GolesPage]
})
export class GolesPageModule {}
