import { Component, OnInit } from '@angular/core';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Storage } from '@ionic/storage';
import { ActionSheetController, NavController, Platform, AlertController } from '@ionic/angular';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})

export class CalendarioPage implements OnInit {
  

  lista_temporadas=[];
  temporadas:string;
  lista_series=[];
  lista_categorias=[];
  lista_calendario=[];
  series:string;
  idarbitros:string;
  categorias:string;
  buscarCale="";
  fecha: Date= new Date();
  idequipo1:string;
  date: string = "";
  type: 'string';
 idarbitro:string;
 fechaInfo: Date= new Date();

  constructor(private webServicePillaro:WsLigaPillaroService,
  private storage:Storage,
  private actionSheetController: ActionSheetController,
  private routes:NavController,
  private localNotification: LocalNotifications,
  private plt: Platform,
  ) {   }


Notificaciones(texto) {
  this.localNotification.schedule({
    title: 'Arbitros',
    text: texto
  /*   data: { secret: 'secret' }, */
   /*  trigger : {in: 5, unit: ELocalNotificationTriggerUnit.SECOND} */
  });
}

onChange($event){
  this.storage.get('usuarioArbi').then((usuario)=>{
    this.idarbitros=usuario.datos.idarbitro;
    console.log(this.idarbitros);
  console.info("aqui estoy", this.date);
  console.log("Datos del calendario", $event.format('YYYY-MM-DD'));
  this.webServicePillaro.listCalendario( $event.format('YYYY-MM-DD'), this.idarbitros).pipe(
    finalize(async () => {
        await this.webServicePillaro.loading.dismiss();
    }))
  .subscribe((data=>{
    let datos:any=data
    console.log(datos);
    if(datos.status=="Ok"){

      this.lista_calendario=datos.calendarios;

    }else{
      this.webServicePillaro.presentToast(datos.mensaje);
      this.lista_calendario=[' '];
    }
  }));
});
} 

  ngOnInit() {
    
    this.storage.get('usuarioArbi').then((usuario)=>{
      this.idarbitros=usuario.datos.idarbitro;
      console.log(usuario);
    });
    
    /*this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.listTemporadas().pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status=="Ok"){
          this.lista_temporadas=datos.temporadas;
        }else{
          this.webServicePillaro.presentToast(datos.mensaje);
        }
      }));
    }); */

  }

 /*  cargarSeries(){
  
    this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.listsSeries(this.temporadas).pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status=="Ok"){
          this.lista_series=datos.series;
         
        }else{
          this.webServicePillaro.presentToast(datos.mensaje);
        }
      }));
    });
  }

  cargarTemporadas(){

    this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.listCategorias(this.temporadas,this.series).pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        console.log(datos);
        
        if(datos.status=="Ok"){
          this.lista_categorias=datos.categorias;
        }else{
          this.webServicePillaro.presentToast(datos.mensaje);
        }
      }));
    });
  } */

cargarCalendario(){
      this.webServicePillaro.listCalendario(this.fecha, this.idarbitros).pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        console.log(datos);
        if(datos.status=="Ok"){
          
          this.lista_calendario=datos.calendarios;
        }else{
          this.webServicePillaro.presentToast('NO HAY PARTIDOS EN ESTA FECHA');
          this.lista_calendario=[' '];
        }
      })); 
  }
 /* Aqui quiero mandar los datos de calendario */
  reporteInfo(calendario=this.lista_calendario){  
    
    this.storage.set('calendario', calendario).then(()=>{
      //envia a la pagina de informe
      this.routes.navigateRoot('/reporteinfo');
    });
  }

  /////SUB-MENU DE INGRESOS
async llamar(calendario, idequipo1){
  console.log(calendario);
  console.log(idequipo1);

  let datos ={
    "calendario":calendario,
    "idequipo":idequipo1
  }
  this.storage.set('calendario',datos).then(()=>{
 //envia a la pagina de ingreso de alineacion
 this.routes.navigateForward('ingresoalineacion');
 
 });
}

  async ingresoCalendario(calendario) {
   
    const actionSheet = await this.actionSheetController.create({
      header: 'Partidos',
      buttons: [
        {
    
        text: 'Ingresar Informe',
        icon: 'contacts',
        handler: () => {
          
          this.storage.set('calendario',calendario).then(()=>{
            //envia a la pagina de informe
            this.routes.navigateForward('ingresoinforme');
          });
       }
      },
      {
    
        text: 'No pitar',
        icon: 'close-circle',
        handler: () => {
          
          this.storage.set('calendario',calendario).then(()=>{
            //envia a la pagina de pitar
            this.routes.navigateForward('nopitar');
          });
       }
      },
     {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  buscar(evento){
    this.buscarCale=evento.detail.value;
  }
}