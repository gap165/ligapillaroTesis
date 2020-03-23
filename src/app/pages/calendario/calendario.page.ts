import { Component, OnInit } from '@angular/core';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Storage } from '@ionic/storage';
import { ActionSheetController, NavController } from '@ionic/angular';
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

  constructor(private webServicePillaro:WsLigaPillaroService, private storage:Storage, private actionSheetController: ActionSheetController, private routes:NavController ) { }

  ngOnInit() {
    this.storage.get('usuarioArbi').then((usuario)=>{
      this.idarbitros=usuario.datos.idarbitro;
      console.log(usuario);

    });
    

    this.webServicePillaro.presentLoading().then(()=>{
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
    });

  }

  cargarSeries(){
  
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
  }

  cargarCalendario(){

    this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.listCalendario(this.temporadas,this.series,this.categorias).pipe(
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
        }
      }));
    });
  }

  /////SUB-MENU DE INGRESOS
  async ingresoCalendario(calendario) {
   
    const actionSheet = await this.actionSheetController.create({
      header: 'Partidos',
      buttons: [{
        text: 'Consultar Alineación',
        icon: 'bookmarks',
       cssClass:'.color',
       
        handler: () => {
          this.storage.set('calendario',calendario).then(()=>{
             //envia a la pagina de ingreso de alineacion
            this.routes.navigateForward('ingresoalineacion');
          });
                 
        }
      },
            
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

   
  

}