import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { RestService } from '../rest/rest';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(
    private googlePlus: GooglePlus,
    private fb: Facebook,
    public rest : RestService,
    public alertCtrl: AlertController) { }


  loginFacebookToken(callback:any) {
    let permissions = ['public_profile', 'user_friends', 'email'];
    this.fb.login(permissions)
    .then((response:any) => {
      let userId = response.authResponse.userID;
      this.fb.api("/me?fields=picture,name,email",permissions)
      .then((authData:any) =>{
        let cliente:any = {}
        cliente.uid = userId;
        cliente.nome = authData.name;
        cliente.social_tipo = 1;
        cliente.email = authData.email;
        cliente.foto  = "https://graph.facebook.com/" + userId + "/picture?type=large";
        callback(cliente)
      },error => {
        callback({error:true, dados : error})
      })
    },error => {
      callback({error:true, dados : error})
    });
  }



  loginGoogle(callback:any) {
    this.googlePlus.login({
      'webClientId' : '728028718468-9tdl7ded3q0ke82at5qb5gir8bvl65td.apps.googleusercontent.com',
      'offline' : true,
      'scopes' : 'profile email'
    })
    .then((authData:any) =>{
      let cliente:any = {};
      cliente.uid = authData.userId;
      cliente.nome = authData.displayName;
      cliente.social_tipo = 2;
      cliente.foto = authData.imageUrl;
      cliente.email = authData.email;
      callback(cliente)
    })
    .catch((error:any) => {
      callback({error:true, dados : error})
    });
  }

}
