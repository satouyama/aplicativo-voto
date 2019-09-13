import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { RestService } from 'src/app/providers/rest/rest';

@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.page.html',
  styleUrls: ['./destaques.page.scss'],
})
export class DestaquesPage implements OnInit {

 public list : any;
  public noticias:any = {};
  public noticia_limit:any = 10;
  constructor(
    public rest:RestService,
    public alertController: AlertController,
    public load:LoadingController,
    public toast: ToastController) {

    
    }

   async ngOnInit() {
    this.buscar(true,() => {});
   }

   async buscar (ativaLoad:boolean = true,callback:any) {
    let load = await this.load.create({message : 'Aguarde...'});
    if (ativaLoad) {
      load.present();
    }
    this.rest.post('noticia/paginacao',{
      pagina: 1,
      limit: this.noticia_limit,
    }).subscribe((dados:any) => {
      this.noticias = dados.data;
      if (ativaLoad) {
        load.dismiss();
      }
      callback(dados)
    },error => {
      if (ativaLoad) {
        load.dismiss();
      }
      callback(false)
    });
   }

   maisprojetos(event:any) {
    this.noticia_limit += 10;
    this.buscar(false,(result) => {
      event.target.complete();
    });
   }


}
