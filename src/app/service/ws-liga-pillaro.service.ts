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

verificarJugador(idjugador: string, cedula: string, nombre1: string, apellido1: string){
  let urlServerc = 'http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=verificarJugador';
  console.log(urlServerc);
  let body = new HttpParams(); 
  body = body.set('idjugador', idjugador);
  body = body.set('cedula', cedula);
  body = body.set('nombre1', nombre1);
  body = body.set('apellido1', apellido1);
  console.log(idjugador);
  console.log(cedula);
  console.log(nombre1);
  console.log(apellido1);
  return this.http.post(urlServerc, body, {responseType:'json'} );
}

insertaInforme( /* idarbitros:string, */ idcalendarioss:string, informe:string, ganador:string,perdedor:string ,resultado:string ,puntos:string ){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers = headers.set('Accept', 'application/json; charset=utf-8');
  return this.http.post('http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=insertarInforme',JSON.stringify({
 /*  'idarbitros':idarbitros, */
  'idcalendarioss':idcalendarioss,
  'informe':informe,
  'ganador':ganador,
  'perdedor':perdedor,
  'resultado':resultado,
  'puntos':puntos
  }),{headers:headers});
}

insertarArbitro( cedula:string, nombre:string, apellido:string, direccion:string, telefono:string,  celular:string, correo:string){
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
  'correo': correo
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

public  insertarFaltas( nombrefalta:string, idjugadors:string, idcalendarios:string){
  let  urlServerc =  'http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=insertarFaltas';
  let body = new HttpParams();

  body = body.set('nombrefalta', nombrefalta);
  body = body.set('idjugadors', idjugadors);
  body =  body.set('idcalendarios', idcalendarios)
  return   this.http.post( urlServerc, body , {responseType:'json'}  );
}
public  insertarGol(idjugadores:string, idcalendarios:string){
  let  urlServerc =  'http://localhost/wsligapillaro/ajax/ligapillaro.php/?op=insertarGol';
  let body = new HttpParams();
  body = body.set('idjugadores', idjugadores);
  body =  body.set('idcalendarios', idcalendarios)
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
