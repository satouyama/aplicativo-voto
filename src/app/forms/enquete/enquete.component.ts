import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { RestService } from 'src/app/providers/rest/rest';

import { Observable, forkJoin } from 'rxjs';
import { UploadService } from 'src/app/providers/upload/upload.service';
import { GenericUtil } from 'src/app/util/GenericUtil';
import { EnqueteConcluidaComponent } from './enquete-concluida/enquete-concluida.component';
import { UploaddocComponent } from 'src/app/components/uploaddoc/uploaddoc.component';

@Component({
  selector: 'app-enquete',
  templateUrl: './enquete.component.html',
  styleUrls: ['./enquete.component.scss'],
})
export class EnqueteComponent extends GenericUtil implements OnInit {


  public temas:any[] = [];
  public estados:any[] = [];
  public enquete:any = {};


  constructor(
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private modalCtrl:ModalController,
    public load:LoadingController,  
    private toast: ToastController,
    private rest:RestService,
    private upload:UploadService,
  ) { super()}





  async ngOnInit() {
    this.buscar();
  }

  async buscar () {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    let links = [
      this.rest.buscar('tema'),
      this.rest.buscar('estado'),
    ];
    forkJoin(links).subscribe((dados:any) => {
      console.log(dados);
      this.temas = dados[0]["data"];
      dados[1]["data"].map((estado:any) => {
        this.estados.push({
          type: 'radio',
          name: 'estado_id',
          label: estado.nome,
          value: estado.id
        })
      })
      load.dismiss();
    }, error => {
      load.dismiss();
    })
  }

  async addAlcance () {
    const alert = await this.alertController.create({
      header: 'Escolha um estado',
      inputs: this.estados,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Confirmar',
          role: 'success',
          cssClass: 'success',
          handler: (es_id) => {
            let estado = this.estados.find((estado:any) => es_id === estado.value);
            this.enquete.estado_nome = estado.label;
          }
        }
      ]
    });
    await alert.present();
  }

  removeAlcance () {
    this.enquete.estado_id = null;
    this.enquete.estado_nome = null;
  }

  async salvar () {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.post(`enquete`,this.enquete)
    .subscribe(async (dados:any) => {
      this.enquete = dados.data;
      load.dismiss();
      let toast = await this.toast.create({message : dados.mensagem,duration: 3000});
      toast.present();
      this.fechar().then(async () => {
        const modal = await this.modalController.create({
          component: EnqueteConcluidaComponent,
          componentProps: {enquete : this.enquete}
        });
        return await modal.present();
      })
    },async error => {
      load.dismiss();
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      toast.present();
    })
  }

  async addFonte () {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Link',
        icon: 'globe',
        handler: () => {
          this.addlink();
        }
      }, {
        text: 'Documento',
        icon: 'document',
        handler: async () => {
          const modal = await this.modalController.create({
            component: UploaddocComponent
          });
          await modal.present();
          let result = await modal.onDidDismiss();
          if (result.data && result.data.arquivo) {
            if (!this.enquete.arquivos) this.enquete.arquivos = [];
            this.enquete.arquivos.push(result.data.arquivo);
          }
        }
      }, {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.upload.uploadCamera(1,(arquivo:any) => {
            if (arquivo) {
              if (!this.enquete.arquivos) this.enquete.arquivos = [];
              this.enquete.arquivos.push(arquivo);
            }
          })
        }
      }]
    });
    await actionSheet.present();
  }


  async addlink() {
    const alert = await this.alertController.create({
      header: 'Link!',
      inputs: [
        {
          name: 'link',
          type: 'url',
          placeholder: 'Adicione aqui um link'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Adicionar',
          handler: (dados) => {
            if (!dados) return;
            this.enquete.link = dados.link;
          }
        }
      ]
    });

    await alert.present();
  }

  removeArquivo (arquivo) {
    this.enquete.arquivos = this.enquete.arquivos.filter((a:any) => a.id !== arquivo.id);
  }

  fechar() {
    return this.modalCtrl.dismiss();
  }


}
