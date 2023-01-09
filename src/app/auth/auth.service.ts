import { environment } from 'src/environments/environment.prod';
import { Role } from './role.enum';
import { HttpRequest } from './../common/HttpRequest';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CacheService } from "./caches.service";

import { JwtHelperService } from "@auth0/angular-jwt";

interface LogResponse {
  istatus: boolean;
  token: string;
  role: string;
  data: any;
}
export interface IAuthStatus {
  isAuthenticated: boolean
  role: number
  token: string
}

@Injectable({
  providedIn: "root"
})
export class AuthService extends CacheService {
  data;
  role;
  helper = new JwtHelperService();

  login(token: string) { 
    this.logout();
    this.setCookie("token", token, 1);
    this.role = this.helper.decodeToken(token).role
    this.authStatus();
    // this.setCookie("role", role, 1);
  }

  logout() {
    this.deleteCookie("token", " ", 2);
    // this.deleteCookie("role", " ", 2);
  }

  verifyRole(callable) {
    this.http
      .get<LogResponse>(
        `${environment.APIURL}users/auth`
      )
      .subscribe(
        data => {
          callable(data.data);
          this.role = data.data.role
      },
      );
  }

  isAuthenticate() {
    if (
      this.getCookie("token") != "" &&
      this.getCookie("token") != null
    ) {
      return true;
    }
    return false;
  }

  getLogin() {
    if (
      this.getCookie("token") != "" &&
      this.getCookie("token") != null
    ) {
      return this.helper.decodeToken(this.getToken()).userid
    }else{
      return "";
    }
   
  }
  getToken() {
    return this.getCookie('token');
  }

  authStatus(): IAuthStatus {
    return {
      'isAuthenticated': this.isAuthenticate(),
      'role': this.getRole(),
      'token': this.getLogin()
    } 
  }

  getRole() {
    if (
      this.getCookie("token") != "" &&
      this.getCookie("token") != null
    ) {
      return this.helper.decodeToken(this.getToken()).role
    }else{
      return "";
    }
   
  }

  getEmail() {
    if (
      this.getCookie("token") != "" &&
      this.getCookie("token") != null
    ) {
      return this.helper.decodeToken(this.getToken()).email
    }else{
      return "";
    }
    
  }

  constructor(private httpClient: HttpRequest, private http:HttpClient) {
    super();
  }
}
