import { Component, OnInit } from '@angular/core';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { Storage } from '@ionic/storage';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-editargoles',
  templateUrl: './editargoles.page.html',
  styleUrls: ['./editargoles.page.scss'],
})
export class EditargolesPage implements OnInit {
  idarbitros:string;
  idcalendario:string;
  equipo1:string;
  equipo2:string;
  golesequipo1=[];
  golesequipo2=[];
  constructor(
    private webServicePillaro: WsLigaPillaroService,
    private storage: Storage,
    private alertController:AlertController,
    private routes: NavController
  ) { }

  ngOnInit() {
    this.storage.get('usuarioArbi').then((usuario)=>{
      this.idarbitros=usuario.datos.idarbitro;
      console.log(usuario);

    });

    this.storage.get("calendario").then(calendario => {
      console.log(calendario);
      this.idcalendario = calendario.idcalendario;
      this.equipo1=calendario.equipo1;
      this.equipo2=calendario.equipo2;
 
           
                  //##--goless equipo 1

                       this.webServicePillaro
                        .golesE1(this.idcalendario, calendario.idequipo1)
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
                        .golesE2(this.idcalendario, calendario.idequipo2)
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
                      
                ///////////////////////////////

    });
  }

}
