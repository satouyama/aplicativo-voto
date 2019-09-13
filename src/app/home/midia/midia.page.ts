import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/providers/rest/rest';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-midia',
  templateUrl: './midia.page.html',
  styleUrls: ['./midia.page.scss'],
})
export class MidiaPage implements OnInit {
  public cardItems: any;
  public noticias:any = {};
  public noticia_limit:any = 10;
  constructor(
    public rest:RestService,
    public alertController: AlertController,
    public load:LoadingController,
    public toast: ToastController) {
      this.cardItems = [
        {
          user_avtar: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Michael_J._Fox_2012_%28cropped%29_%282%29.jpg',
          user_name: 'Marty McFly',
          date: 'November 5, 1955',
          image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Michael_J._Fox_2012_%28cropped%29_%282%29.jpg',
          content: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
        },
     
      ];}

  

   async ngOnInit() {
    this.buscar(false,() => {});
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
      console.log(dados.data);
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
