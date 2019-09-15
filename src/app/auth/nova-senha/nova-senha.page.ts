
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from 'src/app/providers/rest/rest';
import { LoadingController, ToastController, NavParams, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/providers/auth/authentication.service';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.page.html',
  styleUrls: ['./nova-senha.page.scss'],
})
export class NovaSenhaPage implements OnInit {

  form: FormGroup;
  authState: any;
  public email : any;
  constructor(
    private router: Router,
    private rest:RestService, 
    private location: Location,
    private load:LoadingController, 
    private authService: AuthenticationService,
    private toast: ToastController,
    private activate : ActivatedRoute,
    private navCtrl : NavController
    ) { 

    }

  async ngOnInit() {
    new User();
  
  }
 
  newPassword(user: User) {
   console.log(user);
  }


  async NovaSenha(){
    var data = {
      codigo_verificacao : this.form.value.codigo,
      email : this.email
    }
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.post(`confirma-codigo`, data)
    .subscribe((dados:any) => {
      if(dados.status === "sucess") {
        
      }
      load.dismiss();
      this.form.reset(new User());
    },async error => {
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      await toast.present();
      load.dismiss();
    })
  }

  back(){
 this.navCtrl.navigateRoot('/entrar')
  }



}
