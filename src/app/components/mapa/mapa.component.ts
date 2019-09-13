import { Component, OnInit } from '@angular/core';
import { ToastController, Platform, AlertController, LoadingController, ModalController } from '@ionic/angular';

import * as $ from 'jquery'
import { RestService } from 'src/app/providers/rest/rest';
import { Observable, forkJoin } from 'rxjs';
import { VotopoliticoComponent } from '../votopolitico/votopolitico.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  public estados:any[] = [];
  public poderes:any[] = [];
  public alert:any;
  constructor(
    public rest:RestService,
    public alertController: AlertController,
    public load:LoadingController,
    private toast: ToastController, 
    public modal:ModalController,
    public platform: Platform) {}

   async ngOnInit() {
     let load = await this.load.create({
       message : 'Aguarde...'
     });
     load.present();
    forkJoin([this.rest.buscar('poder')]).subscribe((dados:any) => {
      this.poderes = dados[0]["data"];
      load.dismiss();
    }, error => {
      console.log(error)
      load.dismiss();
    })


   }

  async estado (estado:any) {

    let load = await this.load.create({message : 'Aguarde...'});
    load.present();

    this.rest.buscar(`estado/${estado}`)
    .subscribe(async (estados:any) => {
      load.dismiss();
      console.log(estados);
      const alert = await this.alertController.create({
        cssClass: 'alert-estado',
  
        message : `
          <h3 class="title">
            <ion-icon id="alertEstadoBack" class="alert-estado-back" name="arrow-back"></ion-icon>
            ${estados.data.nome}
          </h3>
          <p class="sub-title">${estados.data.populacao || 0} eleitores</p>
          <div id="actionAlert" class="action action-executivo">
            <div id="actionExecutivo" data-poder="1" class="tipo-action executivo">Executivo</div>
            <div id="actionLegislativo" data-poder="2" class="tipo-action executivo">Legislativo</div>
          </div>
          <div id="menuExecutivo" class="menu executivo">
            <p id="subpoder-federal" class="estado-menu-item">Governo</p>
            <p id="subpoder-governo" class="estado-menu-item">Prefeitura</p>
          </div>
          <div id="menuLegislativo" class="menu legislativo">
            <p id="subpoder-congresso" class="estado-menu-item">Congresso</p>
            <p id="subpoder-assembleia" class="estado-menu-item">Assembléia</p>
            <p id="subpoder-camara" class="estado-menu-item">Câmara</p>
            
          </div>
  
          <div id="politicos" class="politicos"></div>`
      });
      this.alert = alert;
      await alert.present().then(() => {
        let menuLegislativo = $("#menuLegislativo");
        let menuExecutivo = $("#menuExecutivo");
        let actionAlert = $("#actionAlert");
        let politicos = $("#politicos");
        let alertEstadoBack = $("#alertEstadoBack");
  
        let poder:any = '';
        let page:any = this;
  
        $("#actionExecutivo").click(() => {
          menuLegislativo.hide();
          menuExecutivo.show(200);
          $("#actionAlert .tipo-action").removeClass('legislativo').addClass('executivo');
          poder = 'executivo';
        })
        $("#actionLegislativo").click(() => {
          menuExecutivo.hide();
          menuLegislativo.show(200);
          $("#actionAlert .tipo-action").removeClass('executivo').addClass('legislativo');
          poder = 'legislativo';
        })
  
        alertEstadoBack.click(() => {
          actionAlert.show(200);
          politicos.hide();
          alertEstadoBack.hide();
        });
  
        $(".estado-menu-item").click(function(this) {
          let subpoder = $(this).attr("id").split("-")[1];
          alertEstadoBack.show(200);
          actionAlert.hide();
          menuExecutivo.hide();
          menuLegislativo.hide();
          politicos.show();
          
          if (page.alert) {
            page.alert.dismiss();
          }
          page.buscarpoliticos(poder,subpoder,estado);
        })
      });
    }, erro => {
      load.dismiss();
    })

  }


  async buscarpoliticos (poder:string, subpoder:string,estado:number) {
    let load = await this.load.create({message : 'Aguarde...'});
    load.present();

    this.rest.buscar(`politico/estado/${estado}/${poder}/${subpoder}`)
    .subscribe(async (dados:any) => {
      load.dismiss();
      const modal = await this.modal.create({
        component: VotopoliticoComponent,
        componentProps: {dados : dados.data}
      });
      modal.present();
    }, erro => {
      load.dismiss();
    })
  }


  async filtrar () {
    let load = await this.load.create({message : 'Aguarde...'});
    load.present();

    this.rest.buscar(`estado`)
    .subscribe(async (dados:any) => {
      load.dismiss();
      let estaods = dados.data.map(estado => {
        return {
          name: 'radio1',
          type: 'radio',
          label: estado.sigla,
          value: estado.id,
        }
      });
      const alert = await this.alertController.create({
        header: 'Selecionar estado',
        inputs: estaods,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {}
          }, {
            text: 'Selecionar',
            handler: (estado) => {
              console.log(estado);
              this.estado(estado);
            }
          }
        ]
      });

      await alert.present();

    }, erro => {
      load.dismiss();
    })
  }

}
