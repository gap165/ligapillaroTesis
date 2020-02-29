import { NgModule } from '@angular/core';

import { BuscadorPipe } from './buscador.pipe';




@NgModule({
  declarations: [BuscadorPipe],
exports:[ BuscadorPipe],
})
export class PipesModule { }
