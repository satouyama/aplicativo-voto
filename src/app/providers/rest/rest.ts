import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenericUtil } from '../../util/GenericUtil';
import { HookService } from '../../providers/hook/hook';
import { SERVER_URL } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class RestService extends GenericUtil{

  public api = `${SERVER_URL}/${environment.production ? 'api' : ''}/`
  constructor(public http: HttpClient) { 
    super();
  }

  buscar(endpoint){
    return this.http.get(this.api+endpoint);
  }

  put(endpoint,dados:any){
    HookService.get(`rest_atualizar_${endpoint}`).emit(dados);
    return this.http.put(`${this.api}${endpoint}/${dados.id}`,dados);
  }

  post(endpoint,dados:any){
    HookService.get(`rest_criar_${endpoint}`).emit(dados);
    return this.http.post(this.api+endpoint,dados);
  }

  delete(endpoint,dados:any = null){
    HookService.get(`rest_excluir_${endpoint}`).emit(dados);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "* "
      }),
      body: dados,
    };
    
    return this.http.delete(`${this.api}${endpoint}/${dados && dados.id ? dados.id : ''}`,options);
  }


  buscarExt(url){
    return this.http.get(url);
  }


}
