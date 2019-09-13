import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RestService } from '../rest/rest';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private camera: Camera,
    public load: LoadingController,
    public toast: ToastController,
    private rest:RestService) {}

  uploadCamera (tipo:number,callback:any) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(async (imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     let load = await this.load.create({
        message : 'Aguarde...'
      });
      load.present();
      this.rest.post(`upload/base64`,{
        tipo: tipo,
        image : base64Image,
      }).subscribe((dados:any) => {
        callback(dados);
        load.dismiss();
      },async error => {
        load.dismiss();
        let toast = await this.toast.create({message : error.error.mensagem,duration: 3000});
        toast.present();
        callback(false);
      })
    }, (err) => { });
  }
}
