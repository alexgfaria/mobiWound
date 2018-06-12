import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { CamaraPage } from '../camara/camara';
import { PatientListPage } from '../patient-list/patient-list';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  patientListPage = PatientListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPatientListPage(){
    //this.navCtrl.push(PatientListPage)
  this.navCtrl.setRoot(PatientListPage);
  this.navCtrl.popToRoot();
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


}
