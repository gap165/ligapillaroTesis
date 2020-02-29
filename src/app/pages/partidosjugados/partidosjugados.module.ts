import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartidosjugadosPageRoutingModule } from './partidosjugados-routing.module';

import { PartidosjugadosPage } from './partidosjugados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartidosjugadosPageRoutingModule
  ],
  declarations: [PartidosjugadosPage]
})
export class PartidosjugadosPageModule {}
