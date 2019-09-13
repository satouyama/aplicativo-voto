import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-uploaddoc',
  templateUrl: './uploaddoc.component.html',
  styleUrls: ['./uploaddoc.component.scss'],
})
export class UploaddocComponent implements OnInit {

  public arquivo:any = {};
  public uploader: FileUploader = new FileUploader({
    url: `${environment.url}/api/upload/documento`, 
    headers: [{ name: 'Authorization', value: localStorage.getItem('votabrasil:token')}],
    itemAlias: 'doc',
  });


  constructor(
    public load:LoadingController,  
    public toast: ToastController,
    public modalCtrl:ModalController) { }

  async ngOnInit() {
    let load = await this.load.create({
      message : 'Aguarde...'
    });
    
    this.uploader.onAfterAddingFile = (file) => { 
      file.withCredentials = false;
    };
    
    this.uploader.onProgressItem = (progress: any) => {
      load.present();
    };
    this.uploader.onCompleteItem = (item: any, result: any, status: any, headers: any) => {
      this.arquivo = JSON.parse(result);
      this.modalCtrl.dismiss({arquivo: this.arquivo}).then(() => {
        load.dismiss();
      });
     };
  }

  fechar() {
    return this.modalCtrl.dismiss();
  }


}
