import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PatientPage } from '../patient/patient';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';


/**
 * Generated class for the CamaraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camara',
  templateUrl: 'camara.html',

})





export class CamaraPage {
  patientPage: any;
  base64Image: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private gyroscope: Gyroscope) {

  }


  //GIROSCOPO




  viewDataGyro() {
    const options: GyroscopeOptions = {
      frequency: 1000
    }



    this.gyroscope.getCurrent(options)
      .then((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
      })
      .catch()


    this.gyroscope.watch()
      .subscribe((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
      });
  }


   //CAMARA



takePicture() {
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
}

ionViewDidLoad() {
  console.log('ionViewDidLoad CamaraPage');
}

}
