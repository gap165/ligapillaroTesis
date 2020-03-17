import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class WsLigaPillaroService {
  loading:any;

  constructor(public toastController: ToastController,private http: HttpClient,private loadingController:LoadingController) { }

  validarUsu(usuario:string,clave:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=validarUsuario',JSON.stringify({
    'usuario':usuario,
    'clave':clave
    }),{headers:headers});
  }
  ping(){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.get('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=ping', {headers: headers});
  }
  perfilArbi(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=perfilArbi',JSON.stringify({
   }),{headers:headers});
  }

  listaSerie(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listaSerie',JSON.stringify({
   }),{headers:headers});
  }

  listaCategoria(idserie:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listaCategoria',JSON.stringify({
    'idserie': idserie
    }),{headers:headers});
  }

  equipos(idserie:string, idcategoria:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listaEquipos',JSON.stringify({
   'idserie': idserie,
   'idcategoria': idcategoria
    }),{headers:headers});
  }

faltasequipo(idequipo:string){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=faltasEquipos',JSON.stringify({
'idequipo':idequipo  
}),{headers:headers});
}

  jugadores(idequipo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listaJugadores',JSON.stringify({
      'idequipo':idequipo
    }),{headers:headers});
  }

  carnet(idjugador:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=carnetJugador',JSON.stringify({
      'idjugador':idjugador
    }),{headers:headers});
  }

  carnets(idequipo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=carnets',JSON.stringify({
      'idequipo':idequipo
    }),{headers:headers});
  }

  golJugador(idjugadores:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=golesJugador',JSON.stringify({
      'idjugador':idjugadores

    }),{headers:headers});
  }

  comboSerie(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=comboSerie',JSON.stringify({
   }),{headers:headers});
  }

  comboCategoria(idserie:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=comboCategoria',JSON.stringify({
    'idserie': idserie
    }),{headers:headers});
  }

  Goleadores(idserie:string, idcategoria:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=topGoleadores',JSON.stringify({
  'idserie':idserie,
  'idcategoria':idcategoria  
  }),{headers:headers});
  }

  /* #############CALENDARIO################# */
  listTemporadas(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listTemporadas',JSON.stringify({
   }),{headers:headers});
  }

  listsSeries(temporada:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listSeries',JSON.stringify({
    'temporada':temporada
    }),{headers:headers});
  }
  
  listCategorias(temporada:string,serie:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listCategorias',JSON.stringify({
    'temporada':temporada,
    'serie':serie
    }),{headers:headers});
  }

  golesEquipo(idcalendario:string,idequipo1:string,idequipo2:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=golesEquipo',JSON.stringify({
    'idcalendario':idcalendario,
    'idequipo1':idequipo1,
    'idequipo2':idequipo2
    }),{headers:headers});
  }
  faltasEquipo1(idcalendario:string,idequipo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=faltasEquipo1',JSON.stringify({
    'idcalendario':idcalendario,
    'idequipo':idequipo,

    }),{headers:headers});
  }
faltasEquipo2(idcalendario:string,idequipo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=faltasEquipo2',JSON.stringify({
    'idcalendario':idcalendario,
    'idequipo':idequipo
    }),{headers:headers});
  }

  listCalendario(temporada:string,serie:string,idcategoria:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listCalendario',JSON.stringify({
    'temporada':temporada,
    'serie':serie,
    'idcategoria':idcategoria
    }),{headers:headers});
  }

  listarEquiposCaleE1(idcalendario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listarEquiposCaleE1',JSON.stringify({
    'idcalendario':idcalendario
    }),{headers:headers});
  }

  listarEquiposCaleE2(idcalendario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listarEquiposCaleE2',JSON.stringify({
    'idcalendario':idcalendario
    }),{headers:headers});
  }

  listarEquiposInfE1(idcalendario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listarEquiposInf1',JSON.stringify({
    'idcalendario':idcalendario
    }),{headers:headers});
  }

  listarEquiposInfE2(idcalendario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listarEquiposInf2',JSON.stringify({
    'idcalendario':idcalendario
    }),{headers:headers});
  }

  listarAlineacion(idcalendario:string, idequipo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listarAlineacion',JSON.stringify({
    'idcalendario':idcalendario,
    'idequipo':idequipo
    }),{headers:headers});
  }

  listarAlineacionCombo(idcalendario:string, idequipo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listarAlineacionCombo',JSON.stringify({
    'idcalendario':idcalendario,
    'idequipo':idequipo
    }),{headers:headers});
  }

  listarCambios(idcalendario:string, idequipo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listarCambios',JSON.stringify({
    'idcalendario':idcalendario,
    'idequipo':idequipo
    }),{headers:headers});
  }

  listarCambiosCombo(idcalendario:string, idequipo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listarCambiosCombo',JSON.stringify({
    'idcalendario':idcalendario,
    'idequipo':idequipo
    }),{headers:headers});
  }

  listarCambiosRealizados(idcalendarios:string, entra:string, sale:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listarCambiosRealizados',JSON.stringify({
    'idcalendarios':idcalendarios,
    'entra':entra,
    'sale':sale
    }),{headers:headers});
  }

  nombreEquipo(idequipo1:string,idequipo2:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=nombreEquipo',JSON.stringify({
    'idequipo1':idequipo1,
    'idequipo2':idequipo2
    }),{headers:headers});
  }
  
 /* #############FIN CALENDARIO################# */

/* #############TABLA DE POSICIONES################# */
partidosJ(){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=partidosJugados',JSON.stringify({
  }),{headers:headers});
}

partidosG(idequipo1:string,idequipo2:string){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=partidosGanados',JSON.stringify({
  'idequipo1':idequipo1,
  'idequipo2':idequipo2
  }),{headers:headers});
}

partidosP(idequipo1:string,idequipo2:string){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=partidosPerdidos',JSON.stringify({
  'idequipo1':idequipo1,
  'idequipo2':idequipo2
  }),{headers:headers});
}

partidosE(idequipo1:string,idequipo2:string){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=partidosEmpatados',JSON.stringify({
  'idequipo1':idequipo1,
  'idequipo2':idequipo2
  }),{headers:headers});
}

golesF(idequipo:string){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=golesFavor',JSON.stringify({
  'idequipo':idequipo
  }),{headers:headers});
}

golesC(idequipo1:string,idequipo2:string){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=golesContra',JSON.stringify({
  'idequipo1':idequipo1,
  'idequipo2':idequipo2
  }),{headers:headers});
}
/* #############FIN TABLA DE POSICIONES################# */

///###############GENERA QR#############################
generarQR( idjugador:string){
  let  urlServerc =  'http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=generarQR';
  let body = new HttpParams();
  body = body.set('idjugador', idjugador);
  return   this.http.post( urlServerc,  body  , {responseType:'json'} );
}

verificarJugador(textoQR: string ){
  let urlServerc = 'http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=verificarJugador';
  console.log(urlServerc);
  let body = new HttpParams(); 
  body = body.set('textoQR', textoQR);
  
  console.log(textoQR);
 
  return this.http.post(urlServerc, body, {responseType:'json'} );
}

listarDatosInforme(idcalendario:string){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=listarDatosInforme',JSON.stringify({
  'idcalendario':idcalendario
  }),{headers:headers});
}


insertaInforme(  idarbitros:string,  idcalendarioss:string, informe:string, fecha:string,
  equipo1:string, resultado1:string, puntos1:string, equipo2:string, resultado2:string, puntos2:string ){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=insertarInforme',JSON.stringify({
 'idarbitros':idarbitros, 
  'idcalendarioss':idcalendarioss,
  'informe':informe,
  'fecha':fecha,
  'equipo1':equipo1,
  'resultado1':resultado1,
  'puntos1':puntos1,
  'equipo2':equipo2,
  'resultado2':resultado2,
  'puntos2':puntos2 
  }),{headers:headers});
}

insertarArbitro( cedula:string, nombre:string, apellido:string, direccion:string, telefono:string,  celular:string, correo:string, password:string){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=insertarArbitro',JSON.stringify({
  'cedula': cedula,
  'nombre': nombre,
  'apellido': apellido,
  'direccion': direccion,
  'telefono': telefono,
  'celular': celular,
  'correo': correo,
  'password':password
  }),{headers:headers});
}

/* insertarFaltas( nombrefalta:string, idjugadors:string, idcalendarios:string, hora:string){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?
  op=insertarFaltas',JSON.stringify({
    'nombrefalta': nombrefalta,
    'idjugadors': idjugadors,
    'idcalendarios': idcalendarios,
    'hora': hora
  }),{headers:headers});
} */

public  insertarFaltas( nombrefalta:string, idjugadors:string, idcalendarios:string, equipo:string){
  let  urlServerc =  'http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=insertarFaltas';
  let body = new HttpParams();

  body = body.set('nombrefalta', nombrefalta);
  body = body.set('idjugadors', idjugadors);
  body =  body.set('idcalendarios', idcalendarios);
  body =  body.set('equipo', equipo);
  return   this.http.post( urlServerc, body , {responseType:'json'}  );
}
public  insertarGol(idjugadores:string, idcalendarios:string, equipo: string){
  let  urlServerc =  'http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=insertarGol';
  let body = new HttpParams();
  body = body.set('idjugadores', idjugadores);
  body =  body.set('idcalendarios', idcalendarios);
  body =  body.set('equipo', equipo);
  return   this.http.post( urlServerc, body , {responseType:'json'}  );
}

public insertarCambio( idcalendarios:string, entra:string, sale:string, observacion:string){
  let  urlServerc =  'http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=insertarCambio';
  let body = new HttpParams();

  body = body.set('idcalendarios', idcalendarios);
  body =  body.set('entra', entra);
  body = body.set('sale', sale);
  body =  body.set('observacion', observacion);
  return   this.http.post( urlServerc, body , {responseType:'json'}  );
}



  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
        message: 'Cargando...'
    });
  await this.loading.present();
}


 

}
