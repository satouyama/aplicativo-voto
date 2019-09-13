import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ModalController, NavParams } from '@ionic/angular';
import { RestService } from 'src/app/providers/rest/rest';
import { EnquetedetalheComponent } from 'src/app/home/enquetes/components/enquetedetalhe/enquetedetalhe.component';
import { PerfilpoliticocomentarioComponent } from '../perfilpoliticocomentario/perfilpoliticocomentario.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-perfilpolitico',
  templateUrl: './perfilpolitico.component.html',
  styleUrls: ['./perfilpolitico.component.scss'],
})
export class PerfilpoliticoComponent implements OnInit {

  public politico:any = {};
  public segmento:any = "politico";
  public biografia:boolean = false;
  constructor(
    public rest:RestService,
    public load:LoadingController,  
    public toast: ToastController,
    public modalCtrl:ModalController,
    public storage:Storage,
    public params:NavParams) {
      this.politico = this.params.get("politico");
   }

  ngOnInit() {
    console.log(this.politico);
  }


  async openEnquete(enquete:any) {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.buscar(`enquete/${enquete.id}`)
    .subscribe(async (dados:any) => {
      load.dismiss();
      let modal = await this.modalCtrl.create({
        component: EnquetedetalheComponent,
        componentProps: {
          enquete : dados.data
        }
      });
      modal.present();
    },async error => {
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      toast.present();
      load.dismiss();
    })
  }


  async comentarNovo () {
    let modal = await this.modalCtrl.create({
      component: PerfilpoliticocomentarioComponent,
      componentProps: {
        relacao: this.politico
      }
    });
    await modal.present();
    let result = await modal.onDidDismiss();
    if (result.data && result.data.comentario) {
      if (!this.politico.comentarios) this.politico.comentarios = [];
      this.politico.comentarios.push(result.data.comentario);
      console.log(this.politico.comentarios)
    }
  }



  async comentarAtualizar (coment) {
    if (!coment.editar) {
      return;
    }
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.buscar(`comentario/${coment.id}`)
    .subscribe(async (dados:any) => {
      load.dismiss();
      let modal = await this.modalCtrl.create({
        component: PerfilpoliticocomentarioComponent,
        componentProps: {
          comentario : dados.data,
          relacao: this.politico
        }
      });
      await modal.present();
      let result = await modal.onDidDismiss();
      if (result.data && result.data.comentario) {
        if (!this.politico.comentarios) {
          this.politico.comentarios = [];
          this.politico.comentarios.push(result.data.comentario);
        } else {
          this.politico.comentarios = this.politico.comentarios.map((comentarioDefault:any) => {
            if (comentarioDefault.id === result.data.comentario.id) {
              return result.data.comentario;
            }
            return comentarioDefault;
          })
        }
      }
    },async error => {
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      toast.present();
      load.dismiss();
    })
  }

  
  fechar() {
    return this.modalCtrl.dismiss();
  }

}
