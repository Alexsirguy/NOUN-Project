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
  selector: 'app-user-booking-detail-dialog',
  templateUrl: './user-booking-detail-dialog.component.html',
  styleUrls: ['./user-booking-detail-dialog.component.scss']
})
export class UserBookingDetailDialogComponent implements OnInit {
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
  constructor( @Inject(MAT_DIALOG_DATA) private dialogData: SubData,private uiService: UiService, private http: HttpRequest , private formBuilder: FormBuilder, private dialogRef: MatDialogRef<UserBookingDetailDialogComponent>) { }
  ngOnInit() {
    this.id = this.dialogData.id 
    this.getSubscription(this.dialogData.id)
  }
 
 

  getSubscription(id){
    this.onLoading()
    this.http.get(`users/userbooking/${id}`).then((data)=>{
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

  close() {
    this.dialogRef.close();
  }
}
