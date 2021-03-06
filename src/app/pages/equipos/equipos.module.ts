import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EquiposPageRoutingModule } from './equipos-routing.module';
import { EquiposPage } from './equipos.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquiposPageRoutingModule,
    PipesModule
  ],
  declarations: [EquiposPage]
})
export class EquiposPageModule {}
