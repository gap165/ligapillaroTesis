import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GolesPage } from './goles.page';

const routes: Routes = [
  {
    path: '',
    component: GolesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GolesPageRoutingModule {}
