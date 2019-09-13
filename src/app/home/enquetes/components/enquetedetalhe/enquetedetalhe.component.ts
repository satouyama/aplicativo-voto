import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-enquetedetalhe',
  templateUrl: './enquetedetalhe.component.html',
  styleUrls: ['./enquetedetalhe.component.scss'],
})
export class EnquetedetalheComponent implements OnInit {

  public enquete:any;
  constructor(
    public load:LoadingController,  
    public toast: ToastController,
    public modal:ModalController,
    public params:NavParams) { }

  ngOnInit() {
    this.enquete = this.params.get('enquete');
  }


  async editar() {
    
  }

  fechar() {
    return this.modal.dismiss();
  }

}
