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
nombreequipo:string;

url="http://localhost/wsligapillaro/files/jugadores/";

  constructor(private storage:Storage, private webServicePillaro:WsLigaPillaroService,) { }

  ngOnInit() {
  
    this.storage.get('idjugador').then((data)=>{ 
      this.idjugador=data.idjugador;
      this.nombreequipo=data.nombreequipo;
      
      this.webServicePillaro.presentLoading().then(()=>{
        this.webServicePillaro.carnet(this.idjugador).pipe(

          finalize(async () => {
              await this.webServicePillaro.loading.dismiss();
              console.log(data);
              this.generaQR(data.idjugador, data.cedula, data.nombreJ, data.nombreequipo);
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
  generaQR(idjugador,cedula, nombres, nombreequipo){
 let texto=cedula+' '+nombres+' '+nombreequipo;
 

         this.webServicePillaro.generarQR(texto).pipe(
          finalize(async () => {
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{        
            this.imagenqr =data;
            console.log(this.imagenqr);        
        }));
 
    
    
  }
}


