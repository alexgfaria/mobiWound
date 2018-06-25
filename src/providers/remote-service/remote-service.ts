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
  console.log("session getWoundPresentation" + sessionId);
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


/*
 login() {
    return $.ajax({
        type: "POST",
        url: baseUrl + "/session?" + $.param({username: username, password: password}),
        success: function (res) {
            sessionId = res.sessionId;
        }
    });
}
*/
//Ehr-Session": sessionId


}
