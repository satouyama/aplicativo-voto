import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, LoadingController, ToastController, IonSlides } from '@ionic/angular';
import { RestService } from 'src/app/providers/rest/rest';
import { PerfilpoliticoComponent } from '../perfilpolitico/perfilpolitico.component';

@Component({
  selector: 'app-votopolitico',
  templateUrl: './votopolitico.component.html',
  styleUrls: ['./votopolitico.component.scss'],
})
export class VotopoliticoComponent implements OnInit {

  public dados:any;
  public politicos:any[] =[];

  @ViewChild('slides',null) slides: IonSlides;
  
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 5,
  };


  constructor(
    public  modalCtrl:ModalController,
    private rest:RestService, 
    private load:LoadingController, 
    private toast: ToastController,
    public  params:NavParams) {
      this.dados = this.params.get("dados");
      if (this.dados && this.dados.politicos) {
        this.politicos = this.dados.politicos;
      }
   }

  ngOnInit() {
    console.log(this.dados)
    this.slideWillChange();
  }

  slideWillChange() {
     console.log(this.slides);
  }

  filtrar(ev: any){
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.dados.politicos = this.dados.politicos.filter((politico) => {
        return (politico.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.dados.politicos = this.politicos;
    }
  }


  async votar (voto:number = null,politico:any,index:number) {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    if (voto) {
      if (!politico.votacao) {
        politico.votacao = {};
      }
      politico.votacao.voto = voto;
    }
    this.rest.post(`votacao`,{tipo: 2, item: politico})
    .subscribe(async (dados:any) => {
      this.dados.politicos[index] = dados.data;
      load.dismiss();
      let toast = await this.toast.create({message : dados.mensagem,duration: 3000});
      toast.present();
    },async error => {
      let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
      toast.present();
      load.dismiss();
    })
  }



  async politicoPerfil (politico) {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    load.present();
    this.rest.buscar(`politico/${politico.id}`).subscribe(async (dados:any) => {
      load.dismiss();
      let modal = await this.modalCtrl.create({
        component: PerfilpoliticoComponent,
        componentProps: {
          politico : dados.data
        }
      });
      modal.present();
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
