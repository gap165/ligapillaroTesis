import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-faltasequipo',
  templateUrl: './faltasequipo.page.html',
  styleUrls: ['./faltasequipo.page.scss'],
})
export class FaltasequipoPage implements OnInit {
  liga=[];
  idequipo:string;
  buscarFalta="";
  url="http://192.168.1.3/wsligapillaro/files/jugadores/";
  constructor(private storage:Storage,private webServicePillaro:WsLigaPillaroService) { }

  ngOnInit() {
    this.storage.get('idequipo').then((data)=>{
      this.idequipo=data.idequipo;
      this.webServicePillaro.presentLoading().then(()=>{
        this.webServicePillaro.faltasequipo(this.idequipo).pipe(
          finalize(async () => {
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            console.log(datos)
           this.liga=datos.faltasequipo;
          }else{
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        }));
      });
    })
  }
  buscar(evento){
    this.buscarFalta=evento.detail.value;
  }
}
