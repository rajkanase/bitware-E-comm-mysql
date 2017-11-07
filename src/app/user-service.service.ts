import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user';
import {Headers} from '@angular/http';

@Injectable()
export class UserServiceService {

  constructor(
    private http:Http
  ) { }

  currentUser:User;

  private getUrl="/api/getallusers";
  private postUrl="/api/saveuser";
  private loginUrl="api/getoneuser";
  private delUrl = "/api/delete";
  private upUrl = "/api/update";
  private editUrl ="/api/getoneusr";

  getUsers(){
    console.log('in getusers');
    
    return this.http.get(this.getUrl)
    .map((response: Response)=>response.json());
  }


  saveUser(user:User){
      let headers=new Headers({'Content-Type':'application/json' });
      let options=new RequestOptions({headers: headers});
      return this.http.post(this.postUrl, JSON.stringify(user),options)
      .map((response:Response)=>response.json());
  }

  checkLogin(em,pass){
    let url=this.loginUrl+'/'+em+'/'+pass;
    console.log(url);
    
    return this.http.get(url)
    .map((response:Response) => {
      let user = response.json();
      if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          console.log(this.currentUser);
          console.log('hi');
          
      }

      return user;
    });
  
    
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

delUser(email){
  let url=this.delUrl+'/'+email;
  console.log(url);

  return this.http.delete(url)
  .map((response:Response)=>response.json());
}

editUsr(email){

  return this.http.get(this.editUrl+'/'+email).map((response:Response)=>response.json());
}

// updateUsr(email){
//   let headers=new Headers({'Content-Type':'application/json' });
//   let options=new RequestOptions({headers: headers});
//   let url=this.upUrl+'/'+email;
//   return this.http.put(url, JSON.stringify(user),options)
//   .map((response:Response)=>response.json());
// }

private jwt() {
  // create authorization header with jwt token
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
  }
}
  

}
