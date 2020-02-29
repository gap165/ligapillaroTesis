import { Component, OnInit, ɵConsole } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsLigaPillaroService } from 'src/app/service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-carnetjugador',
  templateUrl: './carnetjugador.page.html',
  styleUrls: ['./carnetjugador.page.scss'],
})
export class CarnetjugadorPage implements OnInit {
carnet=[];
imagenqr;
idjugador:string;
url="http://localhost/wsligapillaro/files/jugadores/";
  constructor(private storage:Storage, private webServicePillaro:WsLigaPillaroService,) { }

  ngOnInit() {
  
    this.storage.get('idjugador').then((data)=>{ 
      this.idjugador=data.idjugador;
      
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
  }

   ////genera qr, llamo la funsion
  generaQR(idjugador ){
        this.webServicePillaro.generarQR(idjugador).pipe(
          finalize(async () => {
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{        
            this.imagenqr =data;
            console.log(this.imagenqr);        
        }));
 
    
    
  }
}


