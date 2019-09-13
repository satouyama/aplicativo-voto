import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/providers/rest/rest';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/providers/auth/authentication.service';
import { SocialService } from 'src/app/providers/social/social.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public social:SocialService,
    private router: Router,
    private rest:RestService, 
    private load:LoadingController, 
    private authService: AuthenticationService,
    private toast: ToastController) { }

  ngOnInit() {}

  rota (url) {
    this.router.navigate([url]);
  }

  async facebook(){
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.social.loginFacebookToken((usuario:any) => {
      load.dismiss();
      if (usuario.error) {
        alert(JSON.stringify(usuario.error))
      } else {
        this.loginsocial(usuario)
      }
    });
  }

  async google(){
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.social.loginGoogle((usuario:any) => {
      load.dismiss();
      if (usuario.error) {
        alert(JSON.stringify(usuario.error))
      } else {
        this.loginsocial(usuario)
      }
    });
  }


  async loginsocial(cliente:any) {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.post(`auth/social`,cliente)
    .subscribe((dados:any) => {
      load.dismiss();
      this.authService.login(dados);
      this.router.navigate(['home/destaques']);
    },async error => {
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      await toast.present();
      load.dismiss();
    })
  }
}
