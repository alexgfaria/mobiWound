import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WoundsPage } from '../wounds/wounds';
import * as $ from 'jquery';

/**
 * Generated class for the WoundsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-wounds-list',
  templateUrl: 'wounds-list.html',
})
export class WoundsListPage {
  ehrId : String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ehrId = navParams.get('data');
    console.log('feridas ehrid->>' + this.ehrId);
    this.listagem(this.ehrId);
  }

  //console.log("tou aki" + ehrId);






listagem(ehrId){
  console.log("listagem wonds -->" + ehrId);


// ehrscape API
var baseUrl = "https://rest.ehrscape.com/rest/v1";

var username = 'samueldemo';
var password = 'samuel1demo';
//var ehrId = this.ehrId;

var sessionId;

function login() {
    return $.ajax({
        type: "POST",
        url: baseUrl + "/session?" + $.param({username: username, password: password}),
        success: function (res) {
            sessionId = res.sessionId;
        }
    });
}

function logout() {
    return $.ajax({
        type: "DELETE",
        url: baseUrl + "/session",
        headers: {
            "Ehr-Session": sessionId
        }
    });
}

function woundComposition(ehrId) {
  console.log("cernas -->" + ehrId);
  
  return $.ajax({
      url: baseUrl + "/view/" + ehrId + "/woundCompositions",
      type: 'GET',
      headers: {
          "Ehr-Session": sessionId
      },
      success: function (data) {
          //woundList = data[0];

          console.log("ferida ->" + data[0].templateId);
          

          var html = "";


          for (var i = 0; i < data.length; i++){
            html += '<ion-list>';
            html += '<button ion-item (click)="goToWoundPage(' + '\'' + data[i].compositionUid + '\'' + ')">';
            html += '<div class="compositionsStyle"><h3>' + data[i].templateId + ' #' + (i+1) + '</h3> <h4> Date: ' + data[i].date + '</h4><p> Composition ID: ' + data[i].compositionUid + '</p></div><hr>';
            html += '</button>';
            html += '</ion-list>';
        }
        console.log(html);
        

        $("#woundList").append(html);




          // Name
          //$("#items").html(woundCompositions);
        }
      });
    
  }
  
  
// display page
login().done(function () {
  console.log("3cernas -->"+ehrId);

  $.when(
    woundComposition(ehrId)

  ).then(logout)
});



}


goToWoundPage(compositionUid) {
    
    this.navCtrl.push(WoundsPage, {
      data: compositionUid
  });
  console.log('vai para wounds -> ' + compositionUid);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad WoundsPage');
  }





 
}
