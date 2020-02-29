import { Component, OnInit } from '@angular/core';
import { WsLigaPillaroService } from '../../service/ws-liga-pillaro.service';
import { MenuController, NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ping:any;
  usuario:string='0919125906';
  clave:string='0919125906';
  
  Datos:any=[]
  constructor(private webServicePillaro:WsLigaPillaroService,private menu:MenuController, private storage:Storage,private router:NavController) 
  {
    this.menu.enable(false,'first');
    this.webServicePillaro.presentLoading().then(()=>{
      this.webServicePillaro.ping().pipe(
        finalize(async () => {
            await this.webServicePillaro.loading.dismiss();
        }))
        .subscribe((data=>{
          this.ping=data;
          if(this.ping.status=='Correcto'){
            this.webServicePillaro.presentToast(this.ping.message);
          }else{
            this.webServicePillaro.presentToast('No existe conexion al servidor');
          }
        }));
    })
  }

  ngOnInit() {
      }

  doRefresh(event) {
    this.webServicePillaro.ping()
        .subscribe((data=>{
          this.ping=data;
          if(this.ping.status=='Correcto'){
            this.webServicePillaro.presentToast(this.ping.message);
            event.target.complete();
          }else{
            this.webServicePillaro.presentToast('No existe conexion al servidor');
            event.target.complete();
          }
        }));
  }

loginUser(){
  if(this.clave=="" || this.usuario==""){
    this.webServicePillaro.presentToast('Ingrese todos los campos solicitados');
  }else{
    this.webServicePillaro.presentLoading().then(()=>{
        this.webServicePillaro.validarUsu(this.usuario, this.clave).pipe(
          finalize(async () => {
              // Hide the loading spinner on success or error
              await this.webServicePillaro.loading.dismiss();
          }))
        .subscribe((data=>{

          let datos:any=data
          if(datos.status=="Ok"){
            if(datos.mensaje=="Datos correctos"){
              this.Datos=
              {
               'usuario': this.usuario,
               
               'datos':datos.usuarioArbi[0]
             }
              this.storage.set('usuarioArbi',this.Datos).then(()=>{
                this.router.navigateRoot('/inicio');
              });
            }else{
              this.webServicePillaro.presentToast('El usuario no es un arbitro, revise usuario y contraseña');
            }
          }else{
             this.webServicePillaro.presentToast('El usuario no es un arbitro, revise usuario y contraseña');
          }
        }));
  })}
  }

}
