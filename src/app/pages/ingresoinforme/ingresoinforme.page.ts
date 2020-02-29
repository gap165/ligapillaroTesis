import { Component, OnInit } from '@angular/core';
import { WsLigaPillaroService } from 'src/app/service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-ingresoinforme',
  templateUrl: './ingresoinforme.page.html',
  styleUrls: ['./ingresoinforme.page.scss'],
})
export class IngresoinformePage implements OnInit {
  
  
  constructor(private  webServicePillaro:WsLigaPillaroService) { }

  ngOnInit() {
    
   
  }
  
  insertarInforme(){
   
     
    this.webServicePillaro.presentLoading().then(()=>{
      
      this.webServicePillaro.insertaInforme('idarbitros', 'idcalendarioss', 'informe').pipe(
          finalize(async () => {
              // Hide the loading spinner on success or error
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            //SI SE INSERTO CORRECTAMENTE

              this.webServicePillaro.presentToast(datos.mensaje);

           
          }else{
            //SI HUBO UN ERROR AL INSERTAR
            this.webServicePillaro.presentToast('Error al guardar');
          }
        }));
  })}

}
