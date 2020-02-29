import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsLigaPillaroService } from 'src/app/service/ws-liga-pillaro.service';

@Component({
  selector: 'app-carnets',
  templateUrl: './carnets.page.html',
  styleUrls: ['./carnets.page.scss'],
})
export class CarnetsPage implements OnInit {
carnets=[];
imagenqr;
idequipo:string;
url="http://localhost/wsligapillaro/files/jugadores/";
  constructor(private storage:Storage, private webServicePillaro:WsLigaPillaroService) { }

  ngOnInit() {
    /* this.storage.get('idequipo').then((data)=>{ 
      this.idequipo=data.idequipo;
      
      this.webServicePillaro.presentLoading().then(()=>{
        this.webServicePillaro.carnet(this.idjugador).pipe(
          finalize(async () => {
              await this.webServicePillaro.loading.dismiss();
              this.generaQR(data.idjugador);
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            console.log(datos)
           this.carnet=datos.carnetJ;
          }else{
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        }));
      });
    })
   */
}

}
