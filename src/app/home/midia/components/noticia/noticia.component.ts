import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  public noticia:any;
  constructor(
    public load:LoadingController,  
    public toast: ToastController,
    public modal:ModalController,
    public params:NavParams) { }

  ngOnInit() {
    this.noticia = this.params.get('noticia');
    console.log(this.noticia)
  }


  async editar() {
    
  }

  fechar() {
    return this.modal.dismiss();
  }

}
