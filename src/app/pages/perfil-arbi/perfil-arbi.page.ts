import { Component, OnInit } from '@angular/core';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-perfil-arbi',
  templateUrl: './perfil-arbi.page.html',
  styleUrls: ['./perfil-arbi.page.scss'],
})
export class PerfilArbiPage implements OnInit {
  idarbitro:string;
  fotoss:string;
  nombre:string;
  apellido:string;
  cedula:string;
  direccion:string;
  celular:string;
  telefono:string;
  correo:string;

  arbitro=[];
  url="http://localhost/wsligapillaro/files/arbitros/";

  constructor(private webServicePillaro:WsLigaPillaroService, private storage:Storage) { }

  ngOnInit() {


    //aqui debes cargar los datos de la consulta

    // no estas mandando ningun id
    this.storage.get('usuarioArbi').then((usuario)=>{
      this.idarbitro=usuario.datos.idarbitro;
      this.webServicePillaro.presentLoading().then(()=>{
        this.webServicePillaro.perfilArbi(this.idarbitro).pipe(
          finalize(async () => {
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
           this.cedula=datos.pArbi.cedula;
            this.nombre=datos.pArbi.nombre;
            this.apellido=datos.pArbi.apellido;
            this.direccion=datos.pArbi.direccion;
            this.telefono=datos.pArbi.telefono;
            this.celular=datos.pArbi.celular;
            this.correo=datos.pArbi.correo;
            this.fotoss=datos.pArbi.fotoss;


          }else{
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        }));
      });

    });
  }

  actArbitro(){
    if( this.direccion=="" || this.telefono=="" || this.celular=="" || this.correo==""){
      this.webServicePillaro.presentToast('Ingrese todos los campos solicitados');
    }else{
      this.webServicePillaro.presentLoading().then(()=>{
        
        this.webServicePillaro.actArbitro(this.idarbitro,this.direccion, this.telefono, this.celular, this.correo ).pipe(
            finalize(async () => {
                // Hide the loading spinner on success or error
                await this.webServicePillaro.loading.dismiss();
            }))
          .subscribe((data=>{
            let datos:any=data
            if(datos.status=="Ok"){

             
                this.webServicePillaro.presentToast(datos.mensaje);
                this.ngOnInit();
                
              }else{
                
              this.webServicePillaro.presentToast(datos.mensaje);
            }
          }));
    })}

  }

}
