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
  url="http://192.168.1.3/wsligapillaro/files/arbitros/";

  constructor(private webServicePillaro:WsLigaPillaroService, private storage:Storage) { }

  ngOnInit() {
      this.storage.get('usuarioArbi').then((usuario)=>{
        this.idarbitro=usuario.datos.idarbitro;
        this.fotoss=usuario.datos.fotoss;
        this.nombre=usuario.datos.nombre;
        this.apellido=usuario.datos.apellido;
        this.cedula=usuario.datos.cedula;
        this.direccion=usuario.datos.direccion;
        this.celular=usuario.datos.celular;
        this.telefono=usuario.datos.telefono;
        this.correo=usuario.datos.correo;
        
        console.log(usuario);
  
      });
    /*   this.webServicePillaro.presentLoading().then(()=>{
        this.webServicePillaro.perfilArbi().pipe(
          finalize(async () => {
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            console.log(datos)
           this.arbitro=datos.pArbi
          }else{
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        }));
      }); */
  
  
  }

}
