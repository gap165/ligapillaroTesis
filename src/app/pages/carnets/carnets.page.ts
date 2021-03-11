import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsLigaPillaroService } from 'src/app/service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-carnets',
  templateUrl: './carnets.page.html',
  styleUrls: ['./carnets.page.scss'],
})
export class CarnetsPage implements OnInit {
carnets=[];
imagenqr;
idequipo:string;
idjugador:string;
nombreequipo:string;

url="http://192.168.1.11/wsligapillaro/files/jugadores/";
  constructor(private storage:Storage, private webServicePillaro:WsLigaPillaroService) { }

  ngOnInit() {
     this.storage.get('idequipo').then((data)=>{ 
      this.idequipo=data.idequipo;
      this.idjugador=data.idjugador;
      this.nombreequipo=data.nombreequipo;
      
      
      
      this.webServicePillaro.presentLoading().then(()=>{
        this.webServicePillaro.carnets(this.idequipo).pipe(
          finalize(async () => {
              await this.webServicePillaro.loading.dismiss();
              
              this.generaQR(data.cedula, data.nombreJ,data.N_camiseta,data.nombreequipo);
             
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            console.log(datos)
           this.carnets=datos.carnetE;
          }else{
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        }));
      });
    })
}
   ////genera qr, llamo la funsion
   generaQR(cedula, nombres,N_camiseta, nombreequipo){
    let texto=cedula+' Jugador: '+nombres+' N° camiseta: '+N_camiseta+' Equipo: '+nombreequipo;
    
   
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
