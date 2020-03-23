import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditargolesPageRoutingModule } from './editargoles-routing.module';

import { EditargolesPage } from './editargoles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditargolesPageRoutingModule
  ],
  declarations: [EditargolesPage]
})
export class EditargolesPageModule {}
