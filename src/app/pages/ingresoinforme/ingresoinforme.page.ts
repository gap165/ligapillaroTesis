import { Component, OnInit, Input } from '@angular/core';
import { WsLigaPillaroService } from 'src/app/service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { EquiposPage } from '../equipos/equipos.page';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-ingresoinforme',
  templateUrl: './ingresoinforme.page.html',
  styleUrls: ['./ingresoinforme.page.scss'],
})
export class IngresoinformePage implements OnInit {
  lista_equipos=[];
  falatsequipo1=[];
  faltasequipo2=[];
  golesequipo1=[];
  golesequipo2=[];
  idcalendario:string;
  fecha:string;

  @Input() item:any;
  idarbitros:string="";
  idcalendarioss:string="";
  informe:string="";
  equipo1:string="";
  resultado1:string="";
  puntos1:string="0";
  equipo2:string="";
  nombre_cancha="";
  resultado2:string="";
  puntos2:string="0";

  
  constructor(
    private  webServicePillaro:WsLigaPillaroService,
    private storage: Storage,
    private alertController:AlertController,
    private routes:NavController
    ) { }

  ngOnInit() {
    this.storage.get('usuarioArbi').then((usuario)=>{
      this.idarbitros=usuario.datos.idarbitro;
      console.log(usuario);

    });
    
    this.storage.get("calendario").then(calendario => {
      console.log(calendario);
      this.idcalendario = calendario.idcalendario;
      this.idcalendarioss=calendario.idcalendario;
      this.fecha=calendario.fecha;
    
     
      console.log(calendario);
      this.equipo1=calendario.equipo1;
      this.equipo2=calendario.equipo2;
      this.nombre_cancha=calendario.nombre_cancha;
    

   
        this.webServicePillaro
          .golesEquipo(this.idcalendario, calendario.idequipo1, calendario.idequipo2)
          .subscribe(data => {
            let datos: any = data;
    
            if (datos.status == "Ok") {
              this.resultado1=datos.gEquipo.equipo1;
              this.resultado2=datos.gEquipo.equipo2;

              if(this.resultado1>this.resultado2){
                this.puntos1='GANADOR';
                this.puntos2='PERDEDOR';
              }else if(this.resultado1<this.resultado2){
                this.puntos2='GANADOR';
                this.puntos1='PERDEDOR';
              }else if (this.resultado1==this.resultado2){
                this.puntos2='EMPATE';
                this.puntos1='EMPATE';
              }
                //###########faltas equipo 1

                this.webServicePillaro
                .faltasEquipo1(this.idcalendario, calendario.idequipo1)
                .subscribe(data => {
                  let datos: any = data;
                  if (datos.status == "Ok") {
                    console.log(datos);
                    if(datos.faltas!='FALTAS'){
                      this.falatsequipo1=datos.faltas;
                    }
                    //##--falstas equipo 2

                        this.webServicePillaro
                        .faltasEquipo2(this.idcalendario, calendario.idequipo2)
                        .subscribe(data => {
                          let datos: any = data;
                          if (datos.status == "Ok") {
                            if(datos.faltas!='FALTAS'){
                              this.faltasequipo2=datos.faltas;
                            }
                           
                            console.log(datos);
                          } else {
                            this.webServicePillaro.presentToast(datos.mensaje);
                          }
                         });

                        ///////////////////////
                        //##--goless equipo 1

                        this.webServicePillaro
                        .golesEquipo1(this.idcalendario, calendario.idequipo1)
                        .subscribe(data => {
                          let datos: any = data;
                          if (datos.status == "Ok") {
                            if(datos.goles!='GOLES'){
                              this.golesequipo1=datos.goles;
                            }
                           
                            console.log(datos);
                          } else {
                            this.webServicePillaro.presentToast(datos.mensaje);
                          }
                         }); 

                           //##--goless equipo 2

                        this.webServicePillaro
                        .golesEquipo2(this.idcalendario, calendario.idequipo2)
                        .subscribe(data => {
                          let datos: any = data;
                          if (datos.status == "Ok") {
                            if(datos.goles!='GOLES'){
                              this.golesequipo2=datos.goles;
                            }
                           
                            console.log(datos);
                          } else {
                            this.webServicePillaro.presentToast(datos.mensaje);
                          }
                         });

                  } else {
                    this.webServicePillaro.presentToast(datos.mensaje);
                  }
                 });
                ///////////////////////////////
              
            } else {
       /*        this.webServicePillaro.presentToast(''); */
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
      
      this.webServicePillaro.insertaInforme( this.idarbitros,   this.idcalendarioss , this.informe, this.fecha,
         this.equipo1, this.resultado1, this.puntos1, this.equipo2, this.resultado2, this.puntos2 ).pipe(
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

              this.alerta(datos.mensaje);
              /* this.webServicePillaro.presentToast(datos.mensaje); */
           
          }else{
            //SI HUBO UN ERROR AL INSERTAR
            this.webServicePillaro.presentToast('DATOS NO GUARDADOS');
          }
        }));
  })
   }

}
async alerta(mensaje) {
  const alert = await this.alertController.create({

    header: 'Mensaje',
    
    message: mensaje,
    buttons: [
  
    {
      text: 'ACEPTAR',
      handler: () => {
        this.routes.navigateForward('inicio');
      }
    }]
  });

  await alert.present();
}


}
