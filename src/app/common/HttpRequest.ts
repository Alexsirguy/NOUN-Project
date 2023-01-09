import { environment } from 'src/environments/environment.prod';

import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { JwtHelperService } from "@auth0/angular-jwt";

interface LogResponse {
  code: number
  message: string;
  data: any;
}

@Injectable({
  providedIn: "root"
})

export class HttpRequest {

     API = environment.APIURL;

    async post(url,data) {
        return await this.httpClient.post<LogResponse>(this.API+url,data).toPromise();  
    }  
    
    async put(url,data) {
        return await this.httpClient.put<LogResponse>(this.API+url,data).toPromise();  
    }  

    async get(url) {
        return await this.httpClient.get<LogResponse>(this.API+url).toPromise();  
    }  

    async delete(url) {
        return await this.httpClient.delete<LogResponse>(this.API+url).toPromise();  
    }

    async test(url) {
      return await this.httpClient.get<LogResponse>(url).toPromise();  
  } 

  constructor(private httpClient: HttpClient) {
   
  }
}
