import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilArbiPageRoutingModule } from './perfil-arbi-routing.module';

import { PerfilArbiPage } from './perfil-arbi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilArbiPageRoutingModule
  ],
  declarations: [PerfilArbiPage]
})
export class PerfilArbiPageModule {}
