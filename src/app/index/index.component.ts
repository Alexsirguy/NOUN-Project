import { specialties } from './../../environments/specialties';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpRequest } from './../common/HttpRequest';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
   searchForm:FormGroup
   specialties = specialties
  constructor(private http:HttpRequest,private fb: FormBuilder,private route:Router) { }

  ngOnInit() {
   this.buildform()
  }

  objectKeys(data){
    return Object.keys(data);
  }
  buildform(){
    this.searchForm = this.fb.group({
      term: ["",[]],
      specialty: ["",[]],
      category:["",[]]
    })
  }

  
  search(data:FormGroup){
   if(data.value.term =="" && data.value.specialty == "" && data.value.category==""){
    this.route.navigate(["/catalogs"])
   }else{
     this.route.navigate([`/search`],{queryParams: {term: data.value.term, specialty: data.value.specialty,category:data.value.category}})
   }   
  }
}
