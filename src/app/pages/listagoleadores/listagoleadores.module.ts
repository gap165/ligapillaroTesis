import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListagoleadoresPageRoutingModule } from './listagoleadores-routing.module';

import { ListagoleadoresPage } from './listagoleadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListagoleadoresPageRoutingModule
  ],
  declarations: [ListagoleadoresPage]
})
export class ListagoleadoresPageModule {}
