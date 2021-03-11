import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteinfoPageRoutingModule } from './reporteinfo-routing.module';

import { ReporteinfoPage } from './reporteinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteinfoPageRoutingModule
  ],
  declarations: [ReporteinfoPage]
})
export class ReporteinfoPageModule {}
