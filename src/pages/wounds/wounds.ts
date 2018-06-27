import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { CameraMock } from '@ionic-native-mocks/camera';
import * as $ from 'jquery';
//import * as PresentationRenderer from '../../assets/js/presentation';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { WoundsListPage } from '../wounds-list/wounds-list';
import { PatientListPage } from '../patient-list/patient-list';

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
  public idPaciente;
  public idComposition;
  composition : any;
  imageURL : string;
  public templateId;

  base64Image: string;
  

  posts :any;
  sessionId : String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private remoteServiceProvider : RemoteServiceProvider, private camera: Camera) {
  
  
    this.idPaciente = navParams.get("idPaciente");
    this.idComposition = navParams.get("idComposition");
    this.templateId = navParams.get("templateId");
    console.log('idPaciente ' + this.idPaciente);
    console.log('idComposition ' + this.idComposition);
    //this.composition = this.presentation();
    this.showWound();
    this.getWoundComposition();
    //this.getWoundUrl();
    
    //data[0].composition
    //PresentationRenderer.createInlineView(this.composition)

  }


  showWound(){

    //this.remoteServiceProvider.getPosts(this.ehrId,sessionId).subscribe((data)=>{
      this.remoteServiceProvider.loginUser().then(data => {
        //this.posts = data;
        this.sessionId = data.sessionId;
        //console.log("session do login" + data.sessionId);
        this.remoteServiceProvider.getWoundPresentation(this.idComposition,this.sessionId).then(data => {
          //this.posts = data;

          //console.log(data);
          //console.log(PresentationRenderer.init());
          
          var woundPresentation = PresentationRenderer.createInlineView(data[0].composition);
          var woundMarkup = PresentationRenderer.markup;

          //console.log(woundPresentation);
          //console.log(woundMarkup);
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

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WoundsPage');
  }







//passo 2
getWoundComposition(){
  //this.remoteServiceProvider.getPosts(this.ehrId,sessionId).subscribe((data)=>{
    this.remoteServiceProvider.loginUser().then(data => {
      //this.posts = data;
      this.sessionId = data.sessionId;
      //console.log("session do login" + data.sessionId);
      this.remoteServiceProvider.getWoundComposition(this.idComposition,this.sessionId).then(data => {
        //this.posts = data;
        
        
        this.composition = data.composition;

        console.log('estrutura data ' + this.composition);
        /*
        for (var i = 0; i < data.length; i++){
          this.items.push (data[i].templateId+" \n "+data[i].date)
        }
        */
        //this.items = data[0].templateId;
      });
      
    });
    //console.log("session on getWound Compositions" + this.sessionId);
  
}





//passo 3
saveImageAndUpdateComposition(){
  //this.remoteServiceProvider.getPosts(this.ehrId,sessionId).subscribe((data)=>{
    this.remoteServiceProvider.loginUser().then(data => {
      //this.posts = data;
      this.sessionId = data.sessionId;
      //console.log("session do login" + data.sessionId);
      this.remoteServiceProvider.saveWoundImage(this.sessionId,this.base64Image).then(data => {
        //this.posts = data;
        console.log(data.href);
        
        this.imageURL = data.href; //+ data[0].href;

        console.log("Save image href" + this.imageURL);


        var imagePath = "encounter/skin_wound_scar_assessment/skin_examination:0/inspection_of_skin:0/image";
        var imageSizePath = "encounter/skin_wound_scar_assessment/skin_examination:0/inspection_of_skin:0/image|size";
        var imageMediaTypePath = "encounter/skin_wound_scar_assessment/skin_examination:0/inspection_of_skin:0/image|mediatype";



          this.composition[imagePath] = this.imageURL;
          this.composition[imageMediaTypePath] =   this.base64Image.split(',')[0].split(':')[1].split(';')[0];

          var newComposition = this.composition;
          console.log("update composition imageURL: "+newComposition[imagePath]);
          





            this.remoteServiceProvider.loginUser().then(data => {
              this.sessionId = data.sessionId;
              this.remoteServiceProvider.updateComposition(this.idComposition,this.sessionId,this.templateId,newComposition).then(data => {



                //REFRESHHHH SECTION 

                //udpate composition version
                var compositionVersion = this.idComposition.slice(-1);
                compositionVersion++;
                var newCompositionUid = this.idComposition.slice(0,-1);
                newCompositionUid += compositionVersion;

                
                //refresh Page
              // this.events.publish('updateScreen');
        
             // this.navCtrl.setRoot(PatientListPage);

             this.navCtrl.pop({animate: false});
             this.navCtrl.pop({animate: false});
             this.navCtrl.push(WoundsListPage, {
              data: this.idPaciente
          });  


              //END OF REFRESH

            });
          });
        /*
        for (var i = 0; i < data.length; i++){
          this.items.push (data[i].templateId+" \n "+data[i].date)
        }
        */
        //this.items = data[0].templateId;
      });
      
    });

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
      this.base64Image = 'data:image/png;base64,' + imageData;

      this.saveImageAndUpdateComposition();
    }, (err) => {
      // Handle error
    });
  }
  
  
}