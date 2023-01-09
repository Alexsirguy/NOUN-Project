import { HttpRequest } from './../../../common/HttpRequest';
import { environment } from 'src/environments/environment.prod';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiService } from 'src/app/common/ui.service';
interface SubData{
  id: string;
}
@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss']
})
export class BookDetailsDialogComponent implements OnInit {
  profileForm: FormGroup;
  loading: boolean = false;
  id
  data
  avatar;

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
  constructor( @Inject(MAT_DIALOG_DATA) private dialogData: SubData,private uiService: UiService, private http: HttpRequest , private formBuilder: FormBuilder, private dialogRef: MatDialogRef<BookDetailsDialogComponent>) { }
  ngOnInit() {
    this.id = this.dialogData.id 
    this.getSubscription(this.dialogData.id)
  }
 
 

  getSubscription(id){
    this.onLoading()
    this.http.get(`users/booking/${id}`).then((data)=>{
      if(data.code == 1){
        this.data = data.data
        this.avatar = `${environment.EXTERNALAPI}files/${this.data.user.avatar}`
        this.onSuccess()
      }else{
        this.onFailure()
      }
  }).catch((error)=>{  
    this.onFailure()
  })
}

fulfill(){
  this.loading = true
  this.http.put(`users/bookings`,{id:this.id}).then((data)=>{
    if(data.code == 1){
     this.loading = false
     this.uiService.showToast(data.message);
     this.dialogRef.close({status:true})
    }else{
      this.loading = false
      this.uiService.showToast(data.message);
    }
}).catch((error)=>{ 
  this.loading = false 
  this.uiService.showToast("Network Error! Please try again.");
})
}

  close() {
    this.dialogRef.close();
  }
}
