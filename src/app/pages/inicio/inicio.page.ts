import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private menu:MenuController,private stogare:Storage) {
    this.menu.enable(true,'first');
   }

  ngOnInit() {

    this.stogare.get('usuarioArbi').then((usuario)=>{
      console.log(usuario);
      document.getElementById('titulo').innerHTML=usuario.datos.nombre+' '+usuario.datos.apellido;
    });

   
  }

}
