import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-nopitar',
  templateUrl: './nopitar.page.html',
  styleUrls: ['./nopitar.page.scss'],
})
export class NopitarPage implements OnInit {
idcalendario:string;
observacion:string;
  constructor(
    private  webServicePillaro:WsLigaPillaroService,
    private storage: Storage,
    private alertCtrl: AlertController,
    private routes:NavController
  ) { }

  ngOnInit() {
    this.storage.get("calendario").then(calendario => {
      console.log(calendario);
      this.idcalendario = calendario.idcalendario;
    });
  }

  insertarRazon(){
    if(this.observacion==''
    
    ){
      this.webServicePillaro.presentToast('LLENE LAS RAZONES POR LAS CUALES NO PUEDE PITAR');
      

   }else{
    this.storage.get("calendario").then(calendario => {
      console.log(calendario);
      this.webServicePillaro.presentLoading().then(()=>{
      this.idcalendario = calendario.idcalendario;
      this.webServicePillaro.razon(this.idcalendario, this.observacion ).pipe(
        finalize(async () => {
            // Hide the loading spinner on success or error
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        
        if(datos.status=="Ok"){
            

            this.alertaRazon(datos.mensaje);
            /* this.webServicePillaro.presentToast(datos.mensaje); */
         
        }else{
          //SI HUBO UN ERROR AL INSERTAR
          this.webServicePillaro.presentToast('DATOS NO GUARDADOS');
        }
      }));
    })
    });
 
  
   }
  }

  async alertaRazon(mensaje) {
    const alert = await this.alertCtrl.create({
  
      header: 'Mensaje',
      
      message: mensaje,
      buttons: [
    
      {
        text: 'ACEPTAR',
        handler: () => {
          this.routes.navigateForward('login');
        }
      }]
    });
  
    await alert.present();
  }
}
