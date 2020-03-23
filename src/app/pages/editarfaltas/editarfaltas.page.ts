import { Component, OnInit } from '@angular/core';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { Storage } from '@ionic/storage';
import { AlertController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-editarfaltas',
  templateUrl: './editarfaltas.page.html',
  styleUrls: ['./editarfaltas.page.scss'],
})
export class EditarfaltasPage implements OnInit {
  idarbitros:string;
  idcalendario:string;
  idequipo:string;
  equipo1:string;
  equipo2:string;
  falatsequipo1=[];
  faltasequipo2=[];
  listar_ComboE1 =[];
  listar_ComboE2 =[];

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
 
           
                //###########faltas equipo 1

                this.webServicePillaro
                .faltasE1(this.idcalendario, calendario.idequipo1)
                .subscribe(data => {
                  let datos: any = data;
                  if (datos.status == "Ok") {
                    console.log(datos);
                    if(datos.faltas!='FALTAS'){
                      this.falatsequipo1=datos.faltas;
                    }
                   
                    
                    //##--falstas equipo 2

                        this.webServicePillaro
                        .faltasE2(this.idcalendario, calendario.idequipo2)
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

                         /* ######################COMBO JUGADORES EQUIPO 1 */
                         
                          this.webServicePillaro
                            .listarJugadoresComboE1(calendario.idequipo1)
                            .subscribe(data => {
                              let datos: any = data;
                              if (datos.status == "Ok") {
                                this.listar_ComboE1 = datos.lJugadores;
                                console.log(this.listar_ComboE1 );
                                
                              } else {
                                this.webServicePillaro.presentToast(datos.mensaje);
                              }
                            });
                        

                    /* ######################COMBO JUGADORES EQUIPO 2 */

                    
                          this.webServicePillaro
                            .listarJugadoresComboE2(calendario.idequipo2)
                           
                            .subscribe(data => {
                              let datos: any = data;
                    
                              if (datos.status == "Ok") {
                                this.listar_ComboE2 = datos.lJugadores;
                                
                                console.log(this.listar_ComboE2 );
                                
                              } else {
                                this.webServicePillaro.presentToast(datos.mensaje);
                              }
                            });
                        


                        ///////////////////////
                      
                  } else {
                    this.webServicePillaro.presentToast(datos.mensaje);
                  }
                 });
                ///////////////////////////////

    });

  }
  cargarComboE1(){
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .listarJugadoresComboE1(this.idequipo)
        .pipe(
          finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
          })
        )
        .subscribe(data => {
          let datos: any = data;

          if (datos.status == "Ok") {
            this.listar_ComboE1 = datos.lJugadores;
            
            console.log(this.listar_ComboE1 );
            
          } else {
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        });
    });
  }

  cargarComboE2(){
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .listarJugadoresComboE2(this.idequipo)
        .pipe(
          finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
          })
        )
        .subscribe(data => {
          let datos: any = data;

          if (datos.status == "Ok") {
            this.listar_ComboE2 = datos.lJugadores;
            
            console.log(this.listar_ComboE2 );
            
          } else {
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        });
    });
  }

}
