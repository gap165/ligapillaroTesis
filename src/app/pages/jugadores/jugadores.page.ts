import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';
import { NavController, ActionSheetController } from '@ionic/angular';
import { browser } from 'protractor';


@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
})
export class JugadoresPage implements OnInit {
  liga=[];
  idequipo:string;
  nequipo:string;
  buscarJugador="";
  url="http://192.168.1.11/wsligapillaro/files/jugadores/";
  constructor(private storage:Storage,private webServicePillaro:WsLigaPillaroService,private routes:NavController, private actionSheetController:ActionSheetController ) { }

  ngOnInit() {
    this.storage.get('idequipo').then((data)=>{
      console.log('entra', data);
      this.idequipo=data.idequipo;
      this.nequipo=data.nombreequipo;
      this.webServicePillaro.presentLoading().then(()=>{
        this.webServicePillaro.jugadores(this.idequipo).pipe(
          finalize(async () => {
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            console.log(datos)
           this.liga=datos.jugadores;
          }else{
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        }));
      });
    });
  }

  async MostarGolesyHuella(idjugador:string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Jugadores',
      buttons: [{
        text: 'Carnet del jugador',
        icon: 'browsers',
       cssClass:'.color',
       
        handler: () => {
          
          this.storage.set('idjugador',idjugador).then(()=>{
             //envia a la pagina de carnet
            this.routes.navigateForward('carnetjugador');
          });
                 
        }
      },
      
      {
        text: 'Ver goles de jugador',
        icon: 'football',
        handler: () => {
          this.storage.set('idjugador',idjugador).then(()=>{
            this.routes.navigateForward('goles');
           
          });
       }
      },    
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  buscar(evento){
    this.buscarJugador=evento.detail.value;
  }
     
}


