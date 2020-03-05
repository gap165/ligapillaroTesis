import { Component, OnInit, Input } from '@angular/core';
import { WsLigaPillaroService } from 'src/app/service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-ingresoinforme',
  templateUrl: './ingresoinforme.page.html',
  styleUrls: ['./ingresoinforme.page.scss'],
})
export class IngresoinformePage implements OnInit {
  lista_equipos=[];
  idcalendario:string;

  @Input() item:any;
  idarbitros:string="";
  idcalendarioss:string="";
  informe:string="";
  ganador:string="";
  perdedor:string="";
  resultado:string="";
  puntos:string="";
  
  constructor(
    private  webServicePillaro:WsLigaPillaroService,
    private storage: Storage 
    ) { }

  ngOnInit() {
    this.storage.get("calendario").then(calendario => {
      console.log(calendario);
      this.idcalendario = calendario.idcalendario;
      this.cargarEquipos(calendario.idcalendario);
    });
   
  }
  cargarEquipos(idcalendario){
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .listarEquiposInfE1(idcalendario)
        .pipe(
          finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
          })
        )
        .subscribe(data => {
          let datos: any = data;
          if (datos.status == "Ok") {
            this.lista_equipos = datos.lEquiposInf;

            // this.lista_equipos.push(datos.lEquipos[0]);
            this.webServicePillaro.presentLoading().then(() => {
              this.webServicePillaro
                .listarEquiposInfE2(idcalendario)
                .pipe(
                  finalize(async () => {
                    await this.webServicePillaro.loading.dismiss();
                  })
                )
                .subscribe(data => {
                  let datos: any = data;
                  if (datos.status == "Ok") {
                    this.lista_equipos.push(datos.lEquiposInf[0]);
                    console.log(this.lista_equipos);
                   
                  } else {
                    this.webServicePillaro.presentToast(datos.mensaje);
                  }
                });
            });
          } else {
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        });
    });
  }
  
  insertarInforme(){
   if(this.informe==''||
    this.ganador==''||
    this.perdedor==''||
    this.resultado==''||
    this.puntos=='' ){
      this.webServicePillaro.presentToast('LLENE TODOS LOS CAMPOS');

   }else{
    this.webServicePillaro.presentLoading().then(()=>{
      
      this.webServicePillaro.insertaInforme(/* this.idarbitros , */ this.idcalendario ,
      this.informe , this.ganador , this.perdedor , this.resultado , this.puntos ).pipe(
          finalize(async () => {
              // Hide the loading spinner on success or error
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            console.log(datos);
            //SI SE INSERTO CORRECTAMENTE

              this.webServicePillaro.presentToast(datos.mensaje);
              this.informe=='';
              this.ganador=='';
              this.perdedor=='';
              this.resultado=='';
              this.puntos=='';

           
          }else{
            //SI HUBO UN ERROR AL INSERTAR
            this.webServicePillaro.presentToast('DATOS NO GUARDADOS');
          }
        }));
  })
   }
     
  

}

}
