import { Component, OnInit, ɵConsole } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsLigaPillaroService } from 'src/app/service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';



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
base64Image: any;
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

              
              /* this.Foto(this.url+this.carnet[0].fotos).subscribe(base64data => {
                console.log(base64data);
                this.base64Image = 'data:image/jpg;base64,' + base64data; 
              }); */
              

              this.generaQR(data.idjugador, data.cedula, data.nombreJ,data.N_camiseta, data.nombreequipo);
              
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
  generaQR(idjugador,cedula, nombres, N_camiseta, nombreequipo){
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
  
 /*  Foto(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;  img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }
  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  } */
}


