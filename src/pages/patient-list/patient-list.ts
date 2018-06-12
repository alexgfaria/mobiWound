import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PatienthrPage } from '../patienthr/patienthr';

/**
 * Generated class for the PatientListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-list',
  templateUrl: 'patient-list.html',
})
export class PatientListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }




  openPatientHRPage(){
    this.navCtrl.push(PatienthrPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



}
