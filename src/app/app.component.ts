import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CalendarioPage } from './pages/calendario/calendario.page';
import { LoginPage } from './pages/login/login.page';
import { EquiposPage } from './pages/equipos/equipos.page';
import { FaltasequipoPage } from './pages/faltasequipo/faltasequipo.page';
import { GolesPage } from './pages/goles/goles.page';
import { JugadoresPage } from './pages/jugadores/jugadores.page';
import { ListagoleadoresPage } from './pages/listagoleadores/listagoleadores.page';
import { TablaposicionesPage } from './pages/tablaposiciones/tablaposiciones.page';
import { InicioPage } from './pages/inicio/inicio.page';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
 
  /* menu */
  public Paginas=[
    {title:'Inicio',url:'/inicio',icon:'home'},
    {title:'Perfil Arbitro',url:'/perfil-arbi',icon:'person'},
    {title:'Equipos',url:'/equipos',icon:'people'},
    {title:'Calendario',url:'/calendario',icon:'calendar'},
    {title:'Tabla de Posiciones',url:'/tablaposiciones',icon:'stats'},
    {title:'Lista de Goleadores',url:'/listagoleadores',icon:'football'},
    {title:'Cerrar Sesión',url:'/login',icon:'close-circle'}
];
/* fin-menu */
usuario='demo';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     this. consultausuario();
    });
  }

   consultausuario(){
    this.usuario='Usuario: Arbitro'

   }
}
