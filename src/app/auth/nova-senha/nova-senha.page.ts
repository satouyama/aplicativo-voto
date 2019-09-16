
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
    private navCtrl : NavController,
    private activate : ActivatedRoute
    ) { }

  async ngOnInit() {
    this.createForm(new User());
    this.email = this.activate.snapshot.paramMap.get("email");
  }
 
  createForm(user: User) {
    this.form = new FormGroup({
      senha: new FormControl(user.senha,Validators.required),
      senha2 : new FormControl(user.senha2,Validators.required),
    })
  }


  async novaSenha(){
      var data = {
        senha : this.form.value.senha,
        confirma_senha : this.form.value.senha2,
        email : this.email
      }


    if(this.form.value.senha !== this.form.value.senha2 ){  
      let toast = await this.toast.create({message :"As senhas não conferem",duration: 3500});
      await toast.present();
 
    } else {


      let load = await this.load.create({
        message : 'Aguarde...'
      });
      load.present();
      this.rest.post(`atualiza-senha`, data)
      .subscribe(async (dados:any) => {
          this.router.navigate([`login`]);
          let toast = await this.toast.create({message :"Senha atualizada com sucesso!",duration: 3500});
          await toast.present();
          load.dismiss();
        this.form.reset(new User());
      },async error => {
        let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
        await toast.present();
        load.dismiss();
      })
    }

  }

  back(){
 this.navCtrl.navigateRoot('/entrar')
  }



}
