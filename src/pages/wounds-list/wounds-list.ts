import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WoundsPage } from '../wounds/wounds';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import * as $ from 'jquery';


@IonicPage()
@Component({
  selector: 'page-wounds-list',
  templateUrl: 'wounds-list.html',
})
export class WoundsListPage {
  ehrId : String;
  items : any;
  posts :any;
  sessionId : String;
  compositionUid : string;


  constructor(public navCtrl: NavController, public navParams: NavParams,private remoteServiceProvider : RemoteServiceProvider) {
    this.ehrId = navParams.get('data');
    console.log('feridas ehrid->>' + this.ehrId);
    //this.listagem(this.ehrId);
    this.getWounds();
  }

  getWounds(){

    //this.remoteServiceProvider.getPosts(this.ehrId,sessionId).subscribe((data)=>{
      this.remoteServiceProvider.loginUser().then(data => {
        //this.posts = data;
        this.sessionId = data.sessionId;
        //console.log("session do login" + data.sessionId);
        this.remoteServiceProvider.getWoundList(this.ehrId,this.sessionId).then(data => {
          //this.posts = data;

          this.items = data;
          /*
          for (var i = 0; i < data.length; i++){
            this.items.push (data[i].templateId+" \n "+data[i].date)
          }
          */
          //this.items = data[0].templateId;
        });
        
      });
      console.log("session on getPosts" + this.sessionId);
      
      
 

}


goToWoundPage(ehrId: String, compositionUid: String) {
    this.navCtrl.push(WoundsPage, {
      idPaciente: ehrId,
      idComposition: compositionUid
  });

  console.log('vai para wounds ehrid -> ' + ehrId);
  console.log('vai para wounds composition -> ' + compositionUid);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad WoundsPage');
  }


 
}
