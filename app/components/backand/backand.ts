import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/Rx';

@Injectable()
export class Backand {
  auth_token:{ header_name : string, header_value: string} = {header_name: '', header_value: ''};
  signUp_token:{ header_name : string, header_value: string} = {header_name: '', header_value: ''};
  api_url:string = 'https://api.backand.com';
  app_name:string = 'ebc2';
  auth_type:string = 'N/A';
  auth_status:string = '';
  is_auth_error:boolean = false;
  signuUp_token:string = 'dbaea0da-730d-4039-8f8a-77a507a3e908';

  constructor(public http:Http){

  }

  get tokenUrl(){
    return this.api_url + '/token';
  }

  public signIn(user:string, pass:string){
    this.auth_type = 'Token';
    let creds = `username=${user}` +
      `&password=${pass}` +
      `&appName=${this.app_name}` +
      `&grant_type=password`;    
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.tokenUrl, creds, {
      headers: header
    })
    .map(res => this.getToken(res))
  }

  public extractErrorMessage (err) {
    return JSON.parse(err._body).error_description;
  }

  public signUp(newUser:Object) {
    let userCreds = JSON.stringify(newUser);
    let header = new Headers();
    let signUpUrl = this.api_url + '/user/signup';
    //header.append('SignUpToken', this.signuUp_token);
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(signUpUrl, userCreds, {
      headers: header
      }).map(res => res.json())
  }

   public setSignUpHeader() {
    if (jwt) {
      this.signUp_.header_name = "Authorization";
      this.signUp_.header_value = "Bearer " + jwt;
    }
  }

  private getToken(res) {
    console.log(res);
    return res.json().access_token;
  }

  private get authHeader() {
    var authHeader = new Headers();
    authHeader.append(this.auth_token.header_name, this.auth_token.header_value);
    return authHeader;
  }

  logError(err) {
    console.error('Error: ' + err);
  }
  
  public requestReset (email: string) {
    let header = new Headers();
    let reset = this.api_url + '/1/user/requestResetPassword';
    let resetData = JSON.stringify({
      appName: this.app_name,
      username: email
    });
    
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(reset, resetData, {
      headers: header
    })
    .map(res => this.getToken(res))
  }
}
