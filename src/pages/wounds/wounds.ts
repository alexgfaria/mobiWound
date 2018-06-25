import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { WoundsListPage } from '../wounds-list/wounds-list';
import * as $ from 'jquery';
//import * as PresentationRenderer from '../../assets/js/presentation';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
declare var PresentationRenderer : any;
/**
 * Generated class for the WoundsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wounds',
  templateUrl: 'wounds.html',
})
export class WoundsPage {
  ehrId : string;
  public idPaciente;
  public idComposition;
  composition : any;
 

  posts :any;
  sessionId : String;
  compositionUid : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private remoteServiceProvider : RemoteServiceProvider) {
    
    this.idPaciente = navParams.get("idPaciente");
    this.idComposition = navParams.get("idComposition");
    console.log('idPaciente ' + this.idPaciente);
    console.log('idComposition ' + this.idComposition);
    //this.composition = this.presentation();
    this.getWound();
    //data[0].composition
    //PresentationRenderer.createInlineView(this.composition)

  }


  getWound(){

    //this.remoteServiceProvider.getPosts(this.ehrId,sessionId).subscribe((data)=>{
      this.remoteServiceProvider.loginUser().then(data => {
        //this.posts = data;
        this.sessionId = data.sessionId;
        //console.log("session do login" + data.sessionId);
        this.remoteServiceProvider.getWoundPresentation(this.idComposition,this.sessionId).then(data => {
          //this.posts = data;

          console.log(data);
          //console.log(PresentationRenderer.init());
          
          var woundPresentation = PresentationRenderer.createInlineView(data[0].composition);
          var woundMarkup = PresentationRenderer.markup;

          console.log(woundPresentation);
          console.log(woundMarkup);
          $("#woundMarkup").html(woundMarkup);
          
          

          
          //this.items = data;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad WoundsPage');
  }



 /* presentation(){

   // ehrscape API
    var baseUrl = "https://rest.ehrscape.com/rest/v1";

    var username = 'samueldemo';
    var password = 'samuel1demo';
    var ehrId = this.ehrId;
    
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

    

    function getPost() {
        console.log("sessionid -->" +sessionId);
        var query = "SELECT c FROM Composition c WHERE c/uid/value='" + this.idComposition ;

        return $.ajax({
            type: "POST",
            url: baseUrl + "/presentation",
            data: {'query': query},
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (data) {
                console.log(data);
                
                //sessionId = res.sessionId;

            }
        });
    }




// display page
login().done(function () {
        $.when(
            getPost()
           
        ).then(logout)
    });


  }

*/




getCompositions(){

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
}