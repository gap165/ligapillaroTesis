import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-reporteinfo',
  templateUrl: './reporteinfo.page.html',
  styleUrls: ['./reporteinfo.page.scss'],
})
export class ReporteinfoPage implements OnInit {
idcalendario: string;
repo=[];
fecha:string;
  constructor(
    private storage: Storage,
    private  webServicePillaro:WsLigaPillaroService,
    ) { }

  ngOnInit() {
   
    this.storage.get('calendario').then(cale => {
      console.log( 'AQUI ESTOY',cale);
      this.webServicePillaro.reporteInfo(this.fecha).pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status=="Ok"){
          console.log(datos)
         this.repo=datos.rInforme;
         this.webServicePillaro.presentToast('DATOS CARGADOS');
        }else{
          this.webServicePillaro.presentToast('NO EXISTEN INFORMES EN ESTA FECHA');
          this.repo=[' '];
        }
      }));
     
    });
    
  }
  cargarInforme(){
  
      this.webServicePillaro.reporteInfo(this.fecha).pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status=="Ok"){
          console.log(datos)
         this.repo=datos.rInforme;
         this.webServicePillaro.presentToast('DATOS CARGADOS');
        }else{
       this.webServicePillaro.presentToast('NO EXISTEN INFORMES EN ESTA FECHA');
          this.repo=[' '];
        }
      }));
   
  }
  
}
