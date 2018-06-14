import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { PatientPage } from '../patient/patient';
//import { GiroscopioPage } from '../giroscopio/giroscopio';


@IonicPage()
@Component({
  selector: 'page-camara',
  templateUrl: 'camara.html',

})



export class CamaraPage {
  //patientPage: PatientPage;
  base64Image: string;
  //giroscopioPage: GiroscopioPage;

  constructor( public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {

}

/*takePicture() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad CamaraPage');
  }


}
