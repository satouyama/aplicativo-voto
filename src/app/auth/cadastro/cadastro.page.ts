import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from 'src/app/providers/rest/rest';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/providers/auth/authentication.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

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
      nome: new FormControl(user.nome,Validators.required),
      email: new FormControl(user.email,Validators.required),
      senha: new FormControl(user.senha,Validators.required),
    })
  }

  async cadastrar() {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.form.value.perfil_id = 3;
    this.rest.post(`auth/cadastrar`,this.form.value)
    .subscribe((dados:any) => {
      load.dismiss();
      this.form.reset(new User());
      this.authService.login(dados.data);
      this.router.navigate(['home/destaques']);
    },async error => {
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      await toast.present();
      load.dismiss();
    })
 
  }

  voltar() {
    this.location.back();
  }
}
