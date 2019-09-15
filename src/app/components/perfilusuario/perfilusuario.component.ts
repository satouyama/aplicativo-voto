import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ModalController, NavParams } from '@ionic/angular';
import { RestService } from 'src/app/providers/rest/rest';
import { EnquetedetalheComponent } from 'src/app/home/enquetes/components/enquetedetalhe/enquetedetalhe.component';
import { PerfilusuariocomentarioComponent } from '../perfilusuariocomentario/perfilusuariocomentario.component';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { GenericUtil } from 'src/app/util/GenericUtil';
import { Storage } from '@ionic/storage';
import { HookService } from 'src/app/providers/hook/hook';


@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.scss'],
})
export class PerfilusuarioComponent extends GenericUtil implements OnInit {

  
  public usuario:any = {};
  public segmento:any = "politico";

  public ideologia:boolean = false;
  public editar:boolean = false;
  public follow : any;

  public uploader: FileUploader = new FileUploader({
    url: `${environment.url}/api/upload/documento`, 
    headers: [{ name: 'Authorization', value: localStorage.getItem('votabrasil:token')}],
    itemAlias: 'doc',
  });

  constructor(
    public rest:RestService,
    public load:LoadingController,  
    public toast: ToastController,
    public modalCtrl:ModalController,
    public storage:Storage,
    public params:NavParams) {
      super();
      this.usuario = this.params.get("usuario");
         this.follow = "Seguir";

   }

   
  showIdeologia(){
    if(this.usuario.ideologia) {
         this.ideologia = true;
    } else{
         this.ideologia = false;
    }
  }
  async ngOnInit() {
    console.log(this.usuario )

    let load = await this.load.create({
      message : 'Aguarde...'
    });
    this.uploader.onAfterAddingFile = (file) => { 
      file.withCredentials = false;
    };
    this.uploader.onProgressItem = (progress: any) => {
      load.present();
    };
    this.uploader.onCompleteItem = (item: any, result: any, status: any, headers: any) => {
      let arquivo:any = JSON.parse(result);
      load.dismiss();
      this.usuario.foto = this.uploads(arquivo.caminho);
    };
  }

  async seguir(){
    if(this.follow == "Seguir"){
      this.follow = "Seguindo";
    } else {
      this.follow = "Seguir";
    }
   

    
  }

  uploadFoto () {
    this.uploader.uploadAll();
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
      component: PerfilusuariocomentarioComponent,
      componentProps: {
        relacao: this.usuario
      }
    });
    await modal.present();
    let result = await modal.onDidDismiss();
    if (result.data && result.data.comentario) {
      if (!this.usuario.comentarios) this.usuario.comentarios = [];
      this.usuario.comentarios.push(result.data.comentario);
      console.log(this.usuario.comentarios)
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
        component: PerfilusuariocomentarioComponent,
        componentProps: {
          comentario : dados.data,
          relacao: this.usuario
        }
      });
      await modal.present();
      let result = await modal.onDidDismiss();
      if (result.data && result.data.comentario) {
        if (!this.usuario.comentarios) {
          this.usuario.comentarios = [];
          this.usuario.comentarios.push(result.data.comentario);
        } else {
          this.usuario.comentarios = this.usuario.comentarios.map((comentarioDefault:any) => {
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


  async salvar () {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.put(`usuario`,this.usuario)
    .subscribe(async (dados:any) => {
      load.dismiss();
      let toast = await this.toast.create({message : dados.mensagem,duration: 3000});
      toast.present();
      this.usuario = dados.data;
      this.editar = false;
      this.storage.set('votabrasil:auth',this.usuario);
      HookService.get("updateusuario").emit(this.usuario);
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
