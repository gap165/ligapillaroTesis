import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilArbiPage } from './perfil-arbi.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilArbiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilArbiPageRoutingModule {}
