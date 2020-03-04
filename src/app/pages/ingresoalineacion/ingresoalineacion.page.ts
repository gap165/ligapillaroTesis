import { Component, OnInit } from "@angular/core";
import { WsLigaPillaroService } from "src/app/service/ws-liga-pillaro.service";
import { finalize } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { Platform } from '@ionic/angular';
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
  
  constructor(
    private webServicePillaro: WsLigaPillaroService,
    private storage: Storage,
    private platform: Platform,
    private qrScanner: QRScanner,
    private barcodeScanner: BarcodeScanner
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
      this.idcalendario = calendario.idcalendario;
      this.cargarEquipo(calendario.idcalendario);
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
                    });

                  
                    

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
            this.cargarCombo();
          } else {
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        });
    });
  }


  guardarFaltas(param, idjugadors) {
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .insertarFaltas(param, idjugadors, this.idcalendario)
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
              "Falta ingresada correctamente"
              
            );

            // alert(datos.mensaje);
          } else {
            this.webServicePillaro.presentToast(datos.mensaje);
          }
        });
    });
  }

  guardarGol(idjugadores) {
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .insertarGol(idjugadores, this.idcalendario)
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
            this.webServicePillaro.presentToast("Gol ingresado correctamente");

            // alert(datos.mensaje);
          } else {
            this.webServicePillaro.presentToast("Error al guardar");
          }
        });
    });
  }

  guardarCambios(sale){

    if( this.idJcambio==''){
      this.webServicePillaro.presentToast('NO SELECIONO UN JUGADOR');
    }else{
      this.webServicePillaro.presentLoading().then(() => {
        this.webServicePillaro
          .insertarCambio(this.idcalendario, this.idJcambio, sale, 'cambio' )
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
              this.webServicePillaro.presentToast("Cambio Exitoso");
              
              this.cargarCambiosRealizados(this.idJcambio, sale);
  
              // alert(datos.mensaje);
            } else {
              this.webServicePillaro.presentToast("Error al realizar el cambio");
            }
          });
      });
    }

   
  }

  verificarJ(idjugador, cedula, nombre1, apellido1) {
    this.webServicePillaro.presentLoading().then(() => {
      this.webServicePillaro
        .verificarJugador(idjugador, cedula, nombre1, apellido1)
        .pipe(
          finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
          })
        )
        .subscribe(data => {
          /* alert(data); console.log('datos correctos'); */
          let datos: any = data;
          if (datos.status == "Ok") {
            this.webServicePillaro.presentToast("Datos del Jugador Validados con exito"+datos);

            // alert(datos.mensaje);
          } else {
            this.webServicePillaro.presentToast("Jugador no valido"+datos);
          }

        });
    });
  }

  leerQr(cedula, nombre1, apellido1) {

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
            this.verificarJ(textFound, cedula, nombre1, apellido1 );
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



}
