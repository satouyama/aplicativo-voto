import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { RestService } from 'src/app/providers/rest/rest';
import { Router } from '@angular/router';
import { PerfilusuarioComponent } from '../perfilusuario/perfilusuario.component';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
 public usuarios : any;
  constructor(public modalCtrl: ModalController,
    private router: Router,
    private rest: RestService,
    private toast: ToastController,
    private load: LoadingController,
    public modal:ModalController,
    public modalPerfil : ModalController

  ) { }

  ngOnInit() { }
  
  async teste(event) {

    let load = await this.load.create({
      message: 'Aguarde...'
    });
    console.log(event.detail.value);
    var termo = {
      termo: event.detail.value.toLowerCase()
    }
    this.rest.post('busca', termo).subscribe((dados: any) => {
       this.usuarios= dados;
       console.log(this.usuarios);
        load.dismiss();
    }, async error => {
      let toast = await this.toast.create({ message: "ocorreu um erro", duration: 3000 });
      await toast.present();
      load.dismiss();
    })
  }

  
  async meuPerfil (dados) {
    console.log(dados);
    let load = await this.load.create({
      message : 'Aguarde...'
    });
      let modal = await this.modalPerfil.create({
        component: PerfilusuarioComponent,
        componentProps: {
          usuario : dados
        }
      });
      modal.present();

  }

  fechar() {
    return this.modalCtrl.dismiss();
  }


}
