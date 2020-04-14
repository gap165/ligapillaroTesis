import { Component, OnInit, ɵConsole, Input } from '@angular/core';
import { WsLigaPillaroService } from "src/app/service/ws-liga-pillaro.service";
import { finalize } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { Platform, AlertController, NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner/ngx';



@Component({
  selector: "app-ingresoalineacion",
  templateUrl: "./ingresoalineacion.page.html",
  styleUrls: ["./ingresoalineacion.page.scss"]
})
export class IngresoalineacionPage implements OnInit {
  idcalendario: string;
  idequipo: string;
  idjugador: string;
  cedula: string;
  nombre1: string;
  apellido1: string;
  lista_equipos = [];
  listar_alineacion = [];
  listar_cambios = [];
  listar_alineacionCombo=[];
  nombrefalta: string;
  idjugadors: string;
  hora: string;
  url = "http://localhost/wsligapillaro/files/jugadores/";
  scanSub:any;
  qrText: string;
  idJcambio='';
  idcambios:string;
  entra:string;
  sale:string;
  listar_cambiosR=[];
  numcambios=0;
 nomE:string;
 horagol:string;
  
  constructor(
    private webServicePillaro: WsLigaPillaroService,
    private storage: Storage,
    private platform: Platform,
    private qrScanner: QRScanner,
    private alertController:AlertController,
    private routes:NavController
  ) {

    this.platform.backButton.subscribeWithPriority(0, () => {
      document.getElementsByTagName('body')[0].style.opacity = '1';
      this.scanSub.unsubscribe();
    });
  }

  ngOnInit() {

    //Guardo idcalendario en storage

    this.storage.get("calendario").then(calendario => {
   
        console.log(calendario);
      
        this.idcalendario = calendario.calendario;
      /* this.cargarEquipo(calendario); */
        this.idequipo = calendario.idequipo;
        this.nomE = calendario.equipo1;
       // this.cargarEquipo(this.idcalendario);
        this.cargarAlineacion();
  

    });

    /*   this.storage.get('jugador').then((jugador)=>{
    this.idjugador=jugador.idjugador;

    }); */
  }

  cargarEquipo(idcalendario) {

    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .listarEquiposCaleE1(idcalendario)
        .pipe(
          finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
          })
        )
        .subscribe(data => {
          let datos: any = data;
          if (datos.status == "Ok") {
            this.lista_equipos = datos.lEquipos;

            // this.lista_equipos.push(datos.lEquipos[0]);
            this.webServicePillaro.presentLoading().then(() => {
              this.webServicePillaro
                .listarEquiposCaleE2(idcalendario)
                .pipe(
                  finalize(async () => {
                    await this.webServicePillaro.loading.dismiss();
                  })
                )
                .subscribe(data => {
                  let datos: any = data;
                  if (datos.status == "Ok") {
                    this.lista_equipos.push(datos.lEquipos[0]);
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

  cargarAlineacion() {

    this.listar_alineacion = [];
    this.listar_cambios = [];
    this.listar_alineacionCombo=[];
    this.listar_cambiosR=[];
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .listarAlineacion(this.idcalendario, this.idequipo)
        .pipe(
          finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
          })
        )
        .subscribe(data => {
          let datos: any = data;

          if (datos.status == "Ok") {
            this.listar_alineacion = datos.lAlineacion;
            console.log(this.listar_alineacion);

            //cargar los cambios
            this.webServicePillaro.presentLoading().then(() => {
              this.webServicePillaro
                .listarCambios(this.idcalendario, this.idequipo)
                .pipe(
                  finalize(async () => {
                    await this.webServicePillaro.loading.dismiss();
                  })
                )
                .subscribe(data => {
                  let datos: any = data;

                  if (datos.status == "Ok") {
                    this.listar_cambios = datos.lCambios;
                    console.log(this.listar_cambios);

                    this.webServicePillaro.presentLoading().then(() => {
                      this.webServicePillaro
                        .listarCambiosRealizados(this.idcalendario,'0', '0')
                        .pipe(
                          finalize(async () => {
                            await this.webServicePillaro.loading.dismiss();
                          })
                        )
                        .subscribe(data => {
                          let datos: any = data;

                          this.webServicePillaro.presentLoading().then(() => {
                            this.webServicePillaro
                              .listarAlineacionCombo(this.idcalendario, this.idequipo)
                              .pipe(
                                finalize(async () => {
                                  await this.webServicePillaro.loading.dismiss();
                                })
                              )
                              .subscribe(data => {
                                let datos: any = data;
                      
                                if (datos.status == "Ok") {
                                  this.listar_alineacionCombo = datos.lAlineacion;
                                  
                                  console.log(this.listar_cambios);
                                  
                                } else {
                                  this.webServicePillaro.presentToast(datos.mensaje);
                                }
                              });
                          });
                
                          if (datos.status == "Ok") {
                            this.listar_cambiosR= datos.lCambiosR;
                          
                          } else {
                            this.webServicePillaro.presentToast(datos.mensaje);
                          }
                        });
                    })

                  } else {
                    this.webServicePillaro.presentToast(datos.mensaje);
                  }
                });
            });
            //////////////////////
          } else {
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        });
    });
  }

  cargarCambios() {
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .listarCambios(this.idcalendario, this.idequipo)
        .pipe(
          finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
          })
        )
        .subscribe(data => {
          let datos: any = data;

          if (datos.status == "Ok") {
            this.listar_cambios = datos.lCambios;
            console.log(this.listar_cambios);
          } else {
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        });
    });
  }


  /* COMBO DE JUGADORES PARA CAMBIOS */
  cargarCombo(){
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .listarAlineacionCombo(this.idcalendario, this.idequipo)
        .pipe(
          finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
          })
        )
        .subscribe(data => {
          let datos: any = data;

          if (datos.status == "Ok") {
            this.listar_alineacionCombo = datos.lAlineacion;
            
            console.log(this.listar_cambios);
            
          } else {
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        });
    });
  }

  cargarCambiosRealizados(entra,sale) {
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .listarCambiosRealizados(this.idcalendario,entra, sale)
        .pipe(
          finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
          })
        )
        .subscribe(data => {
          let datos: any = data;

          if (datos.status == "Ok") {
            this.listar_cambiosR= datos.lCambiosR;
            console.log(this.listar_cambiosR);
            this.cargarAlineacion();
          } else {
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        });
    });
  }


  guardarFaltas(param, idjugadors) {
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .insertarFaltas(param, idjugadors, this.idcalendario, this.idequipo)
        .pipe(
          finalize(async () => {
            // Hide the loading spinner on success or error
            await this.webServicePillaro.loading.dismiss();
          })
        )
        .subscribe(data => {
          let datos: any = data;
          if (datos.status == "Ok") {
            console.log(datos);
            this.webServicePillaro.presentToast(
              "FALTA INGRESADA CORRECTAMENTE"
              
            ).then(()=>{
              this.cargarAlineacion();
            });

            // alert(datos.mensaje);
          } else {
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        });
    });
  }

  guardarGol(idjugadores) {


    this.ingresoGol(idjugadores);
    console.log("JUgador seleccionado ", idjugadores);
  
  }

  guardarCambios(sale,entra){

    if(this.numcambios<=3){

      this.webServicePillaro.presentLoading().then(() => {
        this.webServicePillaro
          .insertarCambio(this.idcalendario, entra, sale, 'cambio' )
          .pipe(
            finalize(async () => {
              // Hide the loading spinner on success or error
              await this.webServicePillaro.loading.dismiss();
            })
          )
          .subscribe(data => {
            let datos: any = data;
            if (datos.status == "Ok") {
              console.log(datos);
              this.webServicePillaro.presentToast('CAMBIO EXITOSO');
              this.numcambios++;
              this.cargarCambiosRealizados(entra, sale);
  
              // alert(datos.mensaje);
            } else {
              this.webServicePillaro.presentToast('HA REALIZADOS TODOS LOS CAMBIOS PERMITIDOS');
            }
          });
      });

    }

  }

  verificarJ(textoQR) {
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .verificarJugador(textoQR)
        .pipe(
          finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
          })
        )
        .subscribe(data => {
          /* alert(data); console.log('datos correctos'); */
       
        
          this.alerta(data+textoQR);
            /* this.webServicePillaro.presentToast(data+textoQR); */

       

        }, error=>{alert(JSON.stringify(error));});
    });
  }

  leerQr(textoQR) {

 this.qrScanner.prepare().
    then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.qrScanner.show();
        this.scanSub = document.getElementsByTagName('body')[0].style.opacity = '0';
        debugger
        this.scanSub = this.qrScanner.scan()
          .subscribe((textFound: string) => {
            document.getElementsByTagName('body')[0].style.opacity = '1';
            this.qrScanner.hide();
            this.scanSub.unsubscribe();
            this.verificarJ(textFound);
          }, (err) => {
            alert(JSON.stringify(err));
          });

      } else if (status.denied) {
      } else {

      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  cambioJugador(idjugador){
    console.log(idjugador+'-'+this.idJcambio); 
  }

  async alerta(mensaje) {
    const alert = await this.alertController.create({

      header: 'Mensaje',
      
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async ingresoGol(jugadorSelecionado) {
    const alert = await this.alertController.create({
  
      header: 'INGRESAR MINUTO DE GOL',
      inputs: [
        {
          name: 'min',
         type: 'number',
          placeholder: 'Minuto'
        }
      ],

      buttons: [
    
      { 
        text: 'GUARDAR',
        handler: (data) => {
          this.hora= data.min;
          console.log("mi jugador" , jugadorSelecionado )
          console.log(data);

          // llamo al  servicio 
          this.webServicePillaro.presentLoading().then(() => {
            this.webServicePillaro
              .insertarGol(jugadorSelecionado, this.idcalendario, this.idequipo, this.hora)
              .pipe(
                finalize(async () => {
                  // Hide the loading spinner on success or error
                  await this.webServicePillaro.loading.dismiss();
                })
              )
              .subscribe(data => {
                let datos: any = data;
                if (datos.status == "Ok") {
                  console.log(datos);
                  this.webServicePillaro.presentToast(datos.mensaje);
      
                  // alert(datos.mensaje);
                } else {
                  this.webServicePillaro.presentToast(datos.mensaje);
                }
              });
          });

          this.routes.navigateForward('ingresoalineacion');
        }
      }]
    });
  
    await alert.present();
  }
  

}
