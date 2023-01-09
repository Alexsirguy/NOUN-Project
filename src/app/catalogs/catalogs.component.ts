import { environment } from './../../environments/environment.prod';
import { HttpRequest } from './../common/HttpRequest';
import { UiService } from './../common/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {
  data
  FILEURL = `${environment.EXTERNALAPI}files/`
  loader:boolean;
  success: boolean;
  failure: boolean;
  onLoading(){
    this.loader = true;
    this.success = false;
    this.failure = false;
  }
  onSuccess(){
    this.loader = false;
    this.success = true;
    this.failure = false;
  }
  onFailure(){
    this.loader =false;
    this.success = false;
    this.failure = true;
  }

  constructor(private uiService:UiService, private http: HttpRequest) { }

  ngOnInit(): void {
    this.getTutors()        
  }

  getTutors(){
    this.onLoading()
   this.http.get("accounts/tutors").then((data)=>{
    if(data.code == 1){
        this.data = data.data
        this.onSuccess()
    }else{
      this.uiService.showToast(data.message)
      this.onFailure()
    } 
   }).catch((error)=>{
    this.onFailure()
     this.uiService.showToast("Network Error! Please try again.")
   }) 
  }

}
