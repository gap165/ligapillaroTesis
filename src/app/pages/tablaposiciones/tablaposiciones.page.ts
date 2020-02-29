import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { WsLigaPillaroService } from 'src/app/service/ws-liga-pillaro.service';


@Component({
  selector: 'app-tablaposiciones',
  templateUrl: './tablaposiciones.page.html',
  styleUrls: ['./tablaposiciones.page.scss'],
})
export class TablaposicionesPage implements OnInit {
partidos_J=[];
partidos_G=[];
partidos_P=[];
partidos_E=[];
goles_F=[];
goles_C=[];
idequipo:string;
idequipo1:string;
idequipo2:string;
  constructor(private webServicePillaro:WsLigaPillaroService) { }

  ngOnInit() {
    this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.partidosJ().pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status=="Ok"){
          console.log(datos)
          this.partidos_J=datos.pJ;
        }else{
          this.webServicePillaro.presentToast(datos.mensaje);
        }
      }));
    });
  }

 
}
