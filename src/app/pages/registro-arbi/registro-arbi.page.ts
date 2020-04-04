import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsLigaPillaroService } from 'src/app/service/ws-liga-pillaro.service';
import { finalize } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-registro-arbi',
  templateUrl: './registro-arbi.page.html',
  styleUrls: ['./registro-arbi.page.scss'],
})
export class RegistroArbiPage implements OnInit {

  @Input() item:any;

cedula:string="";
nombre:string="";
apellido:string="";
direccion:string="";
telefono:string="";
celular:string="";
correo:string="";
password:string="";
  constructor(private storage: Storage, private webServicePillaro:WsLigaPillaroService, private menu:MenuController) {
    this.menu.enable(false,'first');
   }

  ngOnInit() {


  }

  guardarArbitro(){

    if (this.cedula=='' ||
      this.nombre=='' ||
      this.apellido=='' ||
      this.direccion=='' ||
      this.telefono=='' ||
      this.celular=='' ||
      this.correo=='' ){
        this.webServicePillaro.presentToast('LLENE TODOS LOS CAMPOS');
      }
      else{
        this.webServicePillaro.presentLoading().then(()=>{
          this.webServicePillaro.insertarArbitro(this.cedula , this.nombre , this.apellido , this.direccion , this.telefono , this.celular , this.correo, this.password).pipe(
              finalize(async () => {
                  // Hide the loading spinner on success or error
                  await this.webServicePillaro.loading.dismiss();
              }))
            .subscribe((data=>{
              let datos:any=data
              if(datos.status=="Ok"){
                //SI SE INSERTO CORRECTAMENTE
    
                  this.webServicePillaro.presentToast(datos.mensaje);
                  this.cedula=='';
                  this.nombre=='';
                  this.apellido=='';
                  this.direccion=='';
                  this.telefono=='';
                  this.celular=='';
                  this.correo=='';
                  
    
    
               
              }else{
                //SI HUBO UN ERROR AL INSERTAR
                this.webServicePillaro.presentToast('Error al guardar');
              }
            }));
      })

      }
    
     
    
}

}
