import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { RestService } from 'src/app/providers/rest/rest';
import { NoticiaComponent } from 'src/app/home/midia/components/noticia/noticia.component';
import { EnquetecomentarioComponent } from 'src/app/home/enquetes/components/enquetecomentario/enquetecomentario.component';
import { NoticiacomentarioComponent } from '../noticiacomentario/noticiacomentario.component';

@Component({
  selector: 'app-noticiaitem-component',
  templateUrl: './noticiaitem.component.html',
  styleUrls: ['./noticiaitem.component.scss'],
  inputs:['img','v2']
})
export class NoticiaitemComponent implements OnInit {

  @Input('noticia') noticia:any;
  public img:boolean = false;
  public v2:boolean = false;

  public segmento:any = "completa";
  constructor(
    public  modal:ModalController,
    private rest:RestService, 
    private load:LoadingController, 
    private toast: ToastController) {}

  ngOnInit() {}

  selecionarSegmento ($item) {
    this.segmento = $item.detail.value;
  }


  async votar (voto:number = null) {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    if (voto) {
      if (!this.noticia.votacao) {this.noticia.votacao = {}}
      this.noticia.votacao.voto = voto;
    }
    this.rest.post(`votacao`,{tipo: 3, item: this.noticia})
    .subscribe(async (dados:any) => {
      this.noticia = dados.data;
      load.dismiss();
      let toast = await this.toast.create({message : dados.mensagem,duration: 3000});
      toast.present();
    },async error => {
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      toast.present();
      load.dismiss();
    })
  }


  async verNoticia (noticia:any) {
    if (this.v2) {
      return;
    }
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.buscar(`noticia/${noticia.id}`)
    .subscribe(async (dados:any) => {
      load.dismiss();
      let modal = await this.modal.create({
        component: NoticiaComponent,
        componentProps: {
          noticia : dados.data
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
    let modal = await this.modal.create({
      component: NoticiacomentarioComponent,
      componentProps: {
        relacao: this.noticia
      }
    });
    await modal.present();
    let result = await modal.onDidDismiss();
    if (result.data && result.data.comentario) {
      if (!this.noticia.comentarios) this.noticia.comentarios = [];
      this.noticia.comentarios.push(result.data.comentario);
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
      let modal = await this.modal.create({
        component: NoticiacomentarioComponent,
        componentProps: {
          comentario : dados.data,
          relacao: this.noticia
        }
      });
      await modal.present();
      let result = await modal.onDidDismiss();
      if (result.data && result.data.comentario) {
        if (!this.noticia.comentarios) {
          this.noticia.comentarios = [];
          this.noticia.comentarios.push(result.data.comentario);
        } else {
          this.noticia.comentarios = this.noticia.comentarios.map((comentarioDefault:any) => {
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
}
