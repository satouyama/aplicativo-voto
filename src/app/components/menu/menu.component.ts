import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { RestService } from 'src/app/providers/rest/rest';
import { PerfilusuarioComponent } from '../perfilusuario/perfilusuario.component';
import { Storage } from '@ionic/storage';
import { HookService } from 'src/app/providers/hook/hook';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  inputs:['nog1']
})
export class MenuComponent implements OnInit {

  public nog1:any;
  public usuario:any;
  constructor(
    public modal:ModalController,
    private rest:RestService, 
    private load:LoadingController, 
    private toast: ToastController,
    public storage: Storage,
    public router:Router) { 
      this.storage.get('votabrasil:auth').then((usuario) => {
        this.usuario = usuario;
        console.log(this.usuario);
      });
    }

  ngOnInit() {
    HookService.get('updateusuario').subscribe((usuario:any) => {
      this.usuario = usuario;
    })
  }


  home () {
    this.router.navigate(['home/destaques'])
  }

  async meuPerfil () {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.buscar(`meuperfil`).subscribe(async (dados:any) => {
      load.dismiss();
      let modal = await this.modal.create({
        component: PerfilusuarioComponent,
        componentProps: {
          usuario : dados.data
        }
      });
      modal.present();
    },async error => {
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      toast.present();
      load.dismiss();
    })
  }
}
