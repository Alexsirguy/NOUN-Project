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
  selector: 'app-edit-subscription-dialog',
  templateUrl: './edit-subscription-dialog.component.html',
  styleUrls: ['./edit-subscription-dialog.component.scss']
})
export class EditSubscriptionDialogComponent implements OnInit {
  profileForm: FormGroup;
  loading: boolean = false;
  months = [1,2,3,4,5,6,7,8,9,10,11,12]

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
  constructor( @Inject(MAT_DIALOG_DATA) private dialogData: SubData,private uiService: UiService, private http: HttpRequest , private formBuilder: FormBuilder, private dialogRef: MatDialogRef<EditSubscriptionDialogComponent>) { }
  ngOnInit() {
    this.buildJoinForm();
    this.profileForm.patchValue({
      id: this.dialogData.id 
    });
    this.getSubscription(this.dialogData.id)
  }
  buildJoinForm() {
    this.profileForm = this.formBuilder.group({
      id:["",[Validators.required]],
      title: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      duration: ["", [Validators.required]],
    });
  }
 
  async update(data: FormGroup) {
    this.loading = true;
    if (data.invalid) {
      this.uiService.showToast("Form field are not properly filled");
      this.loading = false;
    } else {
      try{
        const response = await this.http.put("users/subscription",data.value)
        if(response['code']==1){
          this.dialogRef.close({
            status: true
          })
          this.uiService.showToast(response['message']);
          this.loading = false;
        }else{
          this.uiService.showToast(response['message']);
          this.loading = false;
        }
      }catch(e){
        this.uiService.showToast("Network Error! Please try again.");
        this.loading = false;
      }
     
    }
  }

  getSubscription(id){
    this.onLoading()
    this.http.get(`users/subscription/${id}`).then((data)=>{
    
    this.profileForm.patchValue({
      title: data.data.title,
      duration: data.data.duration,
      amount: data.data.amount
    });
    this.onSuccess()
  }).catch((error)=>{   
    this.onFailure()
  })
}

  close() {
    this.dialogRef.close();
  }


}
