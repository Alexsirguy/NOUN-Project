import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { HttpRequest } from './../common/HttpRequest';
import { UiService } from './../common/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
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

  constructor(private uiService:UiService, private router:Router, private route:ActivatedRoute, private http: HttpRequest) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      params => { 
        this.getTutors( params.get("term"), params.get("specialty"), params.get("category"))  
    });
          
  }

  getTutors(term,specialty,category){
    this.onLoading()
   this.http.get(`accounts/search?term=${term}&specialty=${specialty}&category=${category}`).then((data)=>{
    if(data.code == 1){
      this.onSuccess()
        this.data = data.data
       
    }else{
      this.uiService.showToast(data.message)
      this.onFailure()
    } 
   }).catch((error)=>{
    this.onFailure()
     this.uiService.showToast("Network Error! Please try again.")
   }) 
  }

  catalogs(){
    this.router.navigate(["/catalogs"])
  }

}
