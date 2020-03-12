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
  equipo1:string="";
  resultado1:string="";
  puntos1:string="";
  equipo2:string="";
  resultado2:string="";
  puntos2:string="";
  
  constructor(
    private  webServicePillaro:WsLigaPillaroService,
    private storage: Storage 
    ) { }

  ngOnInit() {
    this.storage.get("calendario").then(calendario => {
      console.log(calendario);
      this.idcalendario = calendario.idcalendario;
      this.idcalendarioss=calendario.idcalendario;
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
    this.equipo1==''||
    this.resultado1==''||
    this.puntos1==''||
    this.equipo2==''||
    this.resultado2==''||
    this.puntos2==''
    ){
      this.webServicePillaro.presentToast('LLENE TODOS LOS CAMPOS');
      

   }else{

    this.webServicePillaro.presentLoading().then(()=>{
      
      this.webServicePillaro.insertaInforme(/* this.idarbitros , */ this.idcalendarioss ,this.informe,
         this.equipo1,this.resultado1,this.puntos1,this.equipo2,this.resultado2,this.puntos2 ).pipe(
          finalize(async () => {
              // Hide the loading spinner on success or error
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          
          if(datos.status=="Ok"){
           

       
              this.informe==' ';
              this.equipo1==' ';
              this.resultado1==' ';
              this.puntos1==' ';
              this.equipo2==' ';
              this.resultado2==' ';
              this.puntos2==' ';
              this.webServicePillaro.presentToast(datos.mensaje);
           
          }else{
            //SI HUBO UN ERROR AL INSERTAR
            this.webServicePillaro.presentToast('DATOS NO GUARDADOS');
          }
        }));
  })
   }
     
  

}

}
