import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from 'src/app/providers/rest/rest';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/providers/auth/authentication.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-esqueceu',
  templateUrl: './esqueceu.page.html',
  styleUrls: ['./esqueceu.page.scss'],
})
export class EsqueceuPage implements OnInit {


  form: FormGroup;
  authState: any;

  constructor(
    private router: Router,
    private rest:RestService, 
    private location: Location,
    private load:LoadingController, 
    private authService: AuthenticationService,
    private toast: ToastController,
    private alertController : AlertController,
    private navigate: NavController
    ) { }

  async ngOnInit() {
    this.createForm(new User());
  }
 
  createForm(user: User) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
   
    })
  }

  async forget() {
   
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.post(`resetar`,this.form.value)
    .subscribe((dados:any) => {
      this.navigate.navigateForward(`forget/${this.form.value.email}`);
      load.dismiss();
      this.form.reset(new User());
    },async error => {
      let toast = await this.toast.create({message : "E-mail não existe",duration: 4000});
      await toast.present();
      load.dismiss();
    })
 
  }



  voltar() {
    this.location.back();
  }
}
