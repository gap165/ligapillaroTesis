import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsLigaPillaroService } from 'src/app/service/ws-liga-pillaro.service';
import { NavController, ActionSheetController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-goles',
  templateUrl: './goles.page.html',
  styleUrls: ['./goles.page.scss'],
})
export class GolesPage implements OnInit {
liga=[];
idjugador:string;



  constructor(private storage:Storage, private webServicePillaro:WsLigaPillaroService, private routes:NavController, private actionSheetController:ActionSheetController) { }

  ngOnInit() {
    this.storage.get('idjugador').then((data)=>{
      this.idjugador=data.idjugador;
      this.webServicePillaro.presentLoading().then(()=>{
        this.webServicePillaro.golJugador(this.idjugador).pipe(
          finalize(async () => {
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            console.log(datos)
           this.liga=datos.golJ
          }else{
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        }));
      });
    })
  }

}
