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
  arbitro=[];
  url="http://localhost/wsligapillaro/files/arbitros/";

  constructor(private webServicePillaro:WsLigaPillaroService, private storage:Storage) { }

  ngOnInit() {
/*     this.storage.get('idarbitro').then((data)=>{
      this.idarbitro=data.idarbitro; */

      this.webServicePillaro.presentLoading().then(()=>{
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
      });
  
  
  }

}
