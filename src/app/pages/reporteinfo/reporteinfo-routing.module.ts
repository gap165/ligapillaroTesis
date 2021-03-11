import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteinfoPage } from './reporteinfo.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteinfoPageRoutingModule {}
