import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/providers/rest/rest';
import { LoadingController, ModalController } from '@ionic/angular';
import { EnqueteComponent } from 'src/app/forms/enquete/enquete.component';

@Component({
  selector: 'app-enquetes',
  templateUrl: './enquetes.page.html',
  styleUrls: ['./enquetes.page.scss'],
})
export class EnquetesPage implements OnInit {

  public segmento:any = "sugeridas";
  public dados:any = {};
  constructor(
    public rest:RestService,
    public load:LoadingController,  
    public modalController: ModalController
  ) { }

  async ngOnInit() {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();

    this.rest.buscar('enquete/usuarios/list').subscribe((dados:any) => {
      this.dados = dados;
      console.log(dados)
      load.dismiss();
    },error => {
      load.dismiss();
    })

  }


  async newEnquete () {
    const modal = await this.modalController.create({
      component: EnqueteComponent
    });
    return await modal.present();
  }

}
