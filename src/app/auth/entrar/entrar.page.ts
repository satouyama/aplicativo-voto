import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from 'src/app/providers/rest/rest';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/providers/auth/authentication.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
})
export class EntrarPage implements OnInit {


  form: FormGroup;
  authState: any;

  constructor(
    private router: Router,
    private rest:RestService, 
    private location: Location,
    private load:LoadingController, 
    private authService: AuthenticationService,
    private toast: ToastController) { }

  async ngOnInit() {
    this.createForm(new User());
  }
 
  createForm(user: User) {
    this.form = new FormGroup({
    	email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      senha: new FormControl(user.senha,Validators.required),
    })
  }

  async logar() {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.post(`auth/login`,this.form.value)
    .subscribe((dados:any) => {
      console.log(dados)
      load.dismiss();
      this.form.reset(new User());
      this.authService.login(dados);
      this.router.navigate(['home/destaques']);
    },async error => {
      let toast = await this.toast.create({message : "Não foi possivel fazer login, tente mais tarde",duration: 3000});
      await toast.present();
      load.dismiss();
    })
 
  }

  voltar () {
    this.location.back();
  }
  forget(){
    this.router.navigate(['/esqueceu'])
  }

}
