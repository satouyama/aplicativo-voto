import { Component, OnInit, Input } from '@angular/core';
import { GenericUtil } from 'src/app/util/GenericUtil';
import { LoadingController, ToastController, NavController, IonNav, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/providers/rest/rest';
import { EnquetedetalheComponent } from '../enquetedetalhe/enquetedetalhe.component';
import { Router } from '@angular/router';
import { EnquetecomentarioComponent } from '../enquetecomentario/enquetecomentario.component';
import { PerfilusuarioComponent } from 'src/app/components/perfilusuario/perfilusuario.component';

@Component({
  selector: 'app-enqueteitem',
  templateUrl: './enqueteitem.component.html',
  styleUrls: ['./enqueteitem.component.scss'],
})
export class EnqueteitemComponent extends GenericUtil implements OnInit {

  @Input('enquete') enquete:any = {};
  @Input('votev2') votev2:any = false;
  @Input('hidevote') hidevote:any = false;
  @Input('classExtra') classExtra:string = "";
  @Input('clickusuario') clickusuario:boolean = false;

  public segmento:any = "atividade";
  
  constructor(
    public modal:ModalController,
    public router:Router,
    private rest:RestService, 
    private load:LoadingController, 
    private toast: ToastController) { super(); }

  ngOnInit() { }


  async votar (voto:number = null) {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    if (voto) {
      if (!this.enquete.votacao) {this.enquete.votacao = {}}
      this.enquete.votacao.voto = voto;
    }
    this.rest.post(`votacao`,{tipo: 1, item: this.enquete})
    .subscribe(async (dados:any) => {
      this.enquete = dados.data;
      load.dismiss();
      let toast = await this.toast.create({message : dados.mensagem,duration: 3000});
      toast.present();
    },async error => {
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      toast.present();
      load.dismiss();
    })
  }

  async verEnquete (enquete:any) {

    if (this.clickusuario) {
      this.verUsuario(enquete.usuario_id);
      return;
    }
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.buscar(`enquete/${enquete.id}`)
    .subscribe(async (dados:any) => {
      console.log(dados)
      load.dismiss();
      let modal = await this.modal.create({
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
    let modal = await this.modal.create({
      component: EnquetecomentarioComponent,
      componentProps: {
        relacao: this.enquete
      }
    });
    await modal.present();
    let result = await modal.onDidDismiss();
    if (result.data && result.data.comentario) {
      if (!this.enquete.comentarios) this.enquete.comentarios = [];
      this.enquete.comentarios.push(result.data.comentario);
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
        component: EnquetecomentarioComponent,
        componentProps: {
          comentario : dados.data,
          relacao: this.enquete
        }
      });
      await modal.present();
      let result = await modal.onDidDismiss();
      if (result.data && result.data.comentario) {
        if (!this.enquete.comentarios) {
          this.enquete.comentarios = [];
          this.enquete.comentarios.push(result.data.comentario);
        } else {
          this.enquete.comentarios = this.enquete.comentarios.map((comentarioDefault:any) => {
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




  async verUsuario (usuarioid:any) {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.buscar(`usuarioperfil/${usuarioid}`)
    .subscribe(async (dados:any) => {
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
