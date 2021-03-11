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
combo_equipo=[];
goleadores=[];
idserie:string;
idcategoria:string;
equipo:string;
buscarJugador="";

 url="http://192.168.1.11/wsligapillaro/files/jugadores/";

  constructor(private webServicePillaro:WsLigaPillaroService ) { }



  ngOnInit() {

   /*  this.webServicePillaro.presentLoading().then(()=>{
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
    }); */
    this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.comboE( ).pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status=="Ok"){
          this.combo_equipo=datos.cEqui;
          console.log(this.combo_equipo);
       }else{
          this.webServicePillaro.presentToast(datos.mensaje);
        }
      }));
    });

  }
  cargaEquipo(){
    this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.comboE().pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status=="Ok"){
          this.combo_equipo=datos.cEqui;
          console.log(this.combo_equipo);
       }else{
          this.webServicePillaro.presentToast(datos.mensaje);
        }
      }));
    });
  }

  cargaGoleadores(){

    this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.Goleadores(this.equipo).pipe(
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
  buscar(evento){
    this.buscarJugador=evento.detail.value;
  }
}
