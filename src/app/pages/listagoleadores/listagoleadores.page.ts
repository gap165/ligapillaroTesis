import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-listagoleadores',
  templateUrl: './listagoleadores.page.html',
  styleUrls: ['./listagoleadores.page.scss'],
})
export class ListagoleadoresPage implements OnInit {
combo_serie=[];
combo_categoria=[];
goleadores=[];
idserie:string;
idcategoria:string;

 url="http://192.168.1.5/wsligapillaro/files/jugadores/";

  constructor(private webServicePillaro:WsLigaPillaroService ) { }



  ngOnInit() {

    this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.comboSerie().pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status=="Ok"){
          this.combo_serie=datos.serieT;
          console.log(this.combo_serie);
       
        }else{
          this.webServicePillaro.presentToast(datos.mensaje);
        }
      }));
    });

  }
  cargaCategoria(){
    this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.comboCategoria(this.idserie).pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status=="Ok"){
          this.combo_categoria=datos.cateT;
          console.log(this.combo_categoria);
       }else{
          this.webServicePillaro.presentToast(datos.mensaje);
        }
      }));
    });
  }

  cargaGoleadores(){

    this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.Goleadores(this.idserie, this.idcategoria).pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status=="Ok"){
          this.goleadores=datos.Goleadores;
          this.webServicePillaro.presentToast('DATOS CARGADOS');
          console.log(this.goleadores);
        }else{
          this.webServicePillaro.presentToast('NO EXISTEN GOLEADORES');
        }
      }));
    });
  }

}
