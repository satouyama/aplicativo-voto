import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ModalController, NavParams } from '@ionic/angular';
import { RestService } from 'src/app/providers/rest/rest';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-noticiacomentario',
  templateUrl: './noticiacomentario.component.html',
  styleUrls: ['./noticiacomentario.component.scss'],
})
export class NoticiacomentarioComponent implements OnInit {

  public comentario:any = {};
  public relacao:any = {};

  form: FormGroup;
  constructor(
    public load:LoadingController,  
    public toast: ToastController,
    private rest:RestService, 
    public modal:ModalController,
    public params:NavParams) {

      this.form = new FormGroup({
        descricao: new FormControl("",Validators.required),
      })

     }

  ngOnInit() {
    this.relacao = this.params.get('relacao');
    this.comentario = this.params.get('comentario');
    if (!this.comentario) {
      this.comentario = {
        descricao: ""
      };
    }
  }


  async salvar() {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.comentario.noticia_id = this.relacao.id
    this.rest.post(`comentario`,{
      item: this.comentario,
    })
    .subscribe(async (dados:any) => {
      load.dismiss();
      let toast = await this.toast.create({message : dados.mensagem,duration: 3000});
      this.modal.dismiss({comentario: dados.data}).then(() => {
        load.dismiss();
      });
      toast.present();
    },async error => {
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      toast.present();
      load.dismiss();
    })
  }
  

  fechar() {
    return this.modal.dismiss();
  }

}
