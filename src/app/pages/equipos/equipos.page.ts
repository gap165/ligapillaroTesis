import { Component, OnInit, ɵConsole } from '@angular/core';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { NavController, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {
  lista_serie=[];
  lista_categoria=[];  
  lista_equipos=[];
  idserie:string;
  idcategoria:string;
  buscarEquipo="";

  url="http://192.168.1.11/wsligapillaro/files/equipos/";

  constructor(private webServicePillaro:WsLigaPillaroService, private storage:Storage,private routes:NavController,private actionSheetController:ActionSheetController) { 
   
  }
 
  ngOnInit() {
 
      /* this.webServicePillaro.presentLoading().then(()=>{
        this.webServicePillaro.listaSerie().pipe(
          finalize(async () => {
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            this.lista_serie=datos.serieE;
            console.log(this.lista_serie);
         
          }else{
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        }));
      }); */

    
        this.webServicePillaro.presentLoading().then(()=>{
          this.webServicePillaro.listaCategoria( ).pipe(
            finalize(async () => {
                await this.webServicePillaro.loading.dismiss();
            }))
          .subscribe((data=>{
            let datos:any=data
            if(datos.status=="Ok"){
              this.lista_categoria=datos.cateE;
              console.log(this.lista_categoria);
           }else{
              this.webServicePillaro.presentToast(datos.mensaje);
            }
          }));
        });

  }

cargarCategoria(){
  console.log('ESTA AQUI');
  this.webServicePillaro.presentLoading().then(()=>{
    this.webServicePillaro.listaCategoria( ).pipe(
      finalize(async () => {
          await this.webServicePillaro.loading.dismiss();
      }))
    .subscribe((data=>{
      let datos:any=data
      if(datos.status=="Ok"){
        this.lista_categoria=datos.cateE;
        console.log(this.lista_categoria);
     }else{
        this.webServicePillaro.presentToast(datos.mensaje);
      }
    }));
  });

}

cargarEquipo(){
  this.webServicePillaro.presentLoading().then(()=>{
    this.webServicePillaro.equipos(this.idcategoria).pipe(
      finalize(async () => {
          await this.webServicePillaro.loading.dismiss();
      }))
    .subscribe((data=>{
      let datos:any=data
     
      if(datos.status=="Ok"){
        this.lista_equipos=datos.equipos;
        console.log(this.lista_equipos);
      }else{
        this.lista_equipos=[' '];
        this.webServicePillaro.presentToast(datos.mensaje);
      }
    }));
  });

}



  async MostarJugadoresyFaltas(idequipo:string) {
   
    const actionSheet = await this.actionSheetController.create({
      header: 'Equipos',
      buttons: [{
        text: 'Tarjetas del equipo',
        icon: 'bookmarks',
       cssClass:'.color',
       
        handler: () => {
          this.storage.set('idequipo',idequipo).then(()=>{
             //envia a la pagina de jugadores
            this.routes.navigateForward('faltasequipo');
          });
                 
        }
      }, {
        text: 'Lista de Jugadores',
        icon: 'contacts',
        handler: () => {
          
          this.storage.set('idequipo',idequipo).then(()=>{
            //envia a la pagina de jugadores
            this.routes.navigateForward('jugadores');
          });
       }

      }, 
      {
        text: 'Lista de Carnets',
        icon: 'card',
        handler: () => {
          
          this.storage.set('idequipo',idequipo).then(()=>{
            //envia a la pagina de jugadores
            this.routes.navigateForward('carnets');
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
    this.buscarEquipo=evento.detail.value;
  }
}
