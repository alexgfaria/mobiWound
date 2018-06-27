import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  baseUrl : string = "https://rest.ehrscape.com/rest/v1";

   username : string = 'samueldemo';
 password : string = 'samuel1demo';
 
 sessionId : string;



//  getApiUrl : string = "https://jsonplaceholder.typicode.com/posts";

getWoundList(ehrId,sessionId) {
console.log("session getWoundList" + sessionId);

  return new Promise(resolve => {
    this.http.get(this.baseUrl+ "/view/" + ehrId + "/woundCompositions",  
    { headers: new HttpHeaders().set('Ehr-Session', sessionId)
  })
  .subscribe(data => {
    resolve(data);
  }, err => {
    console.log(err);
  });
});
}

getWoundPresentation(compositionId,sessionId) {
  console.log("session getWoundPresentation " + sessionId);
  //        var query = "SELECT c FROM Composition c WHERE c/uid/value='" + this.idComposition ;

  var varQuery = {'queryRequestData':{'aql': "SELECT c FROM Composition c WHERE c/uid/value='"+compositionId+"'"}};
    return new Promise(resolve => {
      this.http.post(this.baseUrl + "/presentation",  varQuery,
      { headers: new HttpHeaders().set('Ehr-Session', sessionId).set('Content-Type', 'application/json') },
  )
    .subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
  }





  //passo 2

  getWoundComposition(compositionId,sessionId) {
    console.log("session getWoundComposition " + "session:"+sessionId+" composition:"+compositionId);

  return new Promise(resolve => {
    this.http.get(this.baseUrl+ "/composition/" + compositionId + "?format=FLAT",  
    { headers: new HttpHeaders().set('Ehr-Session', sessionId)
  })
  .subscribe(data => {
    resolve(data);
  }, err => {
    console.log(err);
  });
});
}




//passo 3
saveWoundImage(sessionId,base64Image) {
  console.log("session getWoundURL" + sessionId);
  

  var byteString = atob(base64Image.toString().split(',')[1]);

  var mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];

  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], {type: mimeString}); //or mimeString if you want


    return new Promise(resolve => {
      this.http.post("https://rest.ehrscape.com" + "/store/rest/?mimeType="+mimeString+"/&fileName=imagem", blob /*<img [src]="base64Image"/>*/,
      { headers: new HttpHeaders().set('Ehr-Session', sessionId).set('Accept', 'application/json') },
  )
    .subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
  }






  //passo 3
updateComposition(compositionId,sessionId,templateId,composition) {
  console.log("session getWoundURL" + sessionId + "and compositionUId" + compositionId);

    return new Promise(resolve => {
      this.http.put(this.baseUrl+ "/composition/" + compositionId + "?format=FLAT&templateId="+templateId,composition,
      { headers: new HttpHeaders().set('Ehr-Session', sessionId).set('Accept', 'application/json') },
  )
    .subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
  }








  //GET   https://rest.ehrscape.com/rest/v1/composition/a1f3f2eb-76b2-47f4-b908-5adf25239920::samueldemo.ehrscape.com::1?format=FLAT

//var ehrId = this.ehrId;

//var sessionId;

loginUser() {
  //params : 

  return new Promise((resolve, reject) => {
    this.http.post(this.baseUrl+'/session?', JSON.stringify({ username: this.username,password: this.password}),{
      params: new HttpParams().set('username', this.username).set('password',this.password),
    })
    .subscribe(res => {
     // console.log(res);
      
      resolve(res);
    }, (err) => {
      //console.log(err);
      
      reject(err);
    });
  });
}




}
