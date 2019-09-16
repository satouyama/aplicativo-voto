import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from 'src/app/providers/rest/rest';
import { LoadingController, ToastController, NavParams, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/providers/auth/authentication.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
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
    this.createForm(new User());
    this.email = this.activate.snapshot.paramMap.get("email");
  }
 
  createForm(user: User) {
    this.form = new FormGroup({
 
      code: new FormControl(user.code,Validators.compose([
        Validators.maxLength(6),
      ]))
   
    })
    
  }

  async forget(){

    var data = {
      codigo_verificacao : this.form.value.code,
      email : this.email
    }

    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.post(`confirma-codigo`, data)
    .subscribe(async (dados:any) => {
      console.log(dados)
      if(dados.status === "success"){
         this.router.navigate([`nova-senha/${data.email}`])
         load.dismiss();
        this.form.reset(new User());
      } else {
        load.dismiss();
        let toast = await this.toast.create({message : "Codigo de verificação inváldo",duration: 3000});
        await toast.present();
      }
    },async error => {
      console.log(error)
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      await toast.present();
      load.dismiss();
    })
  }

  back(){
 this.navCtrl.navigateRoot('/entrar')
  }



}
