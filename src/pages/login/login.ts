import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CamaraPage } from '../camara/camara';

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
  camaraPage = CamaraPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewCanLeave() {
   console.log("ionViewEntered")

        this.navCtrl.setRoot(CamaraPage);
        this.navCtrl.popToRoot();
        console.log("ionViewEntered - Standard")


    return true;
  }

}
