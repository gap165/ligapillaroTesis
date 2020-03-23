import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'inicio',
  loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)},
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'equipos',
    loadChildren: () => import('./pages/equipos/equipos.module').then( m => m.EquiposPageModule)
  },
  {
    path: 'faltasequipo',
    loadChildren: () => import('./pages/faltasequipo/faltasequipo.module').then( m => m.FaltasequipoPageModule)
  },
  {
    path: 'goles',
    loadChildren: () => import('./pages/goles/goles.module').then( m => m.GolesPageModule)
  },
  {
    path: 'jugadores',
    loadChildren: () => import('./pages/jugadores/jugadores.module').then( m => m.JugadoresPageModule)
  },
  {
    path: 'listagoleadores',
    loadChildren: () => import('./pages/listagoleadores/listagoleadores.module').then( m => m.ListagoleadoresPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tablaposiciones',
    loadChildren: () => import('./pages/tablaposiciones/tablaposiciones.module').then( m => m.TablaposicionesPageModule)
  },
 
  {
    path: 'ingresoalineacion',
    loadChildren: () => import('./pages/ingresoalineacion/ingresoalineacion.module').then( m => m.IngresoalineacionPageModule)
  },
 
 
  {
    path: 'ingresoinforme',
    loadChildren: () => import('./pages/ingresoinforme/ingresoinforme.module').then( m => m.IngresoinformePageModule)
  },
  {
    path: 'carnetjugador',
    loadChildren: () => import('./pages/carnetjugador/carnetjugador.module').then( m => m.CarnetjugadorPageModule)
  },
  {
    path: 'partidosjugados',
    loadChildren: () => import('./pages/partidosjugados/partidosjugados.module').then( m => m.PartidosjugadosPageModule)
  },
 
  {
    path: 'registro-arbi',
    loadChildren: () => import('./pages/registro-arbi/registro-arbi.module').then( m => m.RegistroArbiPageModule)
  },
  {
    path: 'perfil-arbi',
    loadChildren: () => import('./pages/perfil-arbi/perfil-arbi.module').then( m => m.PerfilArbiPageModule)
  },
  {
    path: 'carnets',
    loadChildren: () => import('./pages/carnets/carnets.module').then( m => m.CarnetsPageModule)
  },
  {
    path: 'editarfaltas',
    loadChildren: () => import('./pages/editarfaltas/editarfaltas.module').then( m => m.EditarfaltasPageModule)
  },
  {
    path: 'editargoles',
    loadChildren: () => import('./pages/editargoles/editargoles.module').then( m => m.EditargolesPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
