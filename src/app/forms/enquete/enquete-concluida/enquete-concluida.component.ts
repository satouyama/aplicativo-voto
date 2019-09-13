import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enquete-concluida',
  templateUrl: './enquete-concluida.component.html',
  styleUrls: ['./enquete-concluida.component.scss'],
})
export class EnqueteConcluidaComponent implements OnInit {

  public enquete:any = {};
  constructor(
    private modalCtrl:ModalController, 
    private socialSharing: SocialSharing,
    private params:NavParams) { }

  ngOnInit() {
    this.enquete = this.params.get('enquete');
  }


  fechar() {
    return this.modalCtrl.dismiss();
  }


  compartilhar () {
    this.socialSharing.share(
      'Veja está enquete no Vota-Brasil',this.enquete.titulo,'',`${environment.url}/enquetesocial/${this.enquete.id}`
    );
  }

}
