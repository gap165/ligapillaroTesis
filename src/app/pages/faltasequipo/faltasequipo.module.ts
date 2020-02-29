import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaltasequipoPageRoutingModule } from './faltasequipo-routing.module';

import { FaltasequipoPage } from './faltasequipo.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaltasequipoPageRoutingModule, 
    PipesModule
  ],
  declarations: [FaltasequipoPage]
})
export class FaltasequipoPageModule {}
