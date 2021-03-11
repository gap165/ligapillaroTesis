import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { WsLigaPillaroService } from "../../service/ws-liga-pillaro.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  interval;
  time: number = 0;
  idarbitro: string;
  constructor(
    private menu: MenuController,
    private stogare: Storage,

    private localNotifications: LocalNotifications,
    private webServicePillaro: WsLigaPillaroService
  ) {
    this.menu.enable(true, "first");
    this.temporizador();
  }

  ngOnInit() {
    this.stogare.get("usuarioArbi").then((usuario) => {
      console.log(usuario);
      document.getElementById("titulo").innerHTML =
        usuario.datos.nombre + " " + usuario.datos.apellido;

      this.idarbitro = usuario.datos.idarbitro;
 
      this.webServicePillaro
        .notiCalendario(this.idarbitro)
         .subscribe((data: any) => {

          console.log(data.noti[0].hora);
          this.localNotifications.schedule({
            text: "Su siguiente partido es a las" + data.noti[0].hora,
            //sound:  'assets/s.mp3' ,
            led: "FF0000",
          });
        });
    });
  }
  temporizador() {
    this.interval = setInterval(() => {
      this.time++;
      this.notificacio();
    }, 50000);
  }
  notificacio() {
    this.stogare.get("usuarioArbi").then((usuario) => {
      this.idarbitro = usuario.datos.idarbitro;
     
      this.webServicePillaro
        .notiCalendario(this.idarbitro)
        .subscribe((data: any) => {
          console.log("*****************************");
          console.log(data);
          console.log(data.noti[0].hora);

          this.localNotifications.schedule({
            text: "Su siguiente partido es a las" + data.noti[0].hora,
            //sound:  'assets/s.mp3' ,
            led: "FF0000",
          });
        });
    });
  }
}
