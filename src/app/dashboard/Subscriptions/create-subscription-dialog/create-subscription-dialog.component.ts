import { HttpRequest } from './../../../common/HttpRequest';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UiService } from 'src/app/common/ui.service';

@Component({
  selector: 'app-create-subscription-dialog',
  templateUrl: './create-subscription-dialog.component.html',
  styleUrls: ['./create-subscription-dialog.component.scss']
})
export class CreateSubscriptionDialogComponent implements OnInit {
  profileForm: FormGroup;
  loading: boolean = false;
  months = [1,2,3,4,5,6,7,8,9,10,11,12]
  constructor(private uiService: UiService, private http: HttpRequest , private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CreateSubscriptionDialogComponent>) { }
  ngOnInit() {
    this.buildJoinForm();
  }
  buildJoinForm() {
    this.profileForm = this.formBuilder.group({
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
        const response = await this.http.post("users/subscription",data.value)
        if(response['code']==1){
          this.dialogRef.close({
            status: true
          })
          this.uiService.showToast(response['message']);
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

  close() {
    this.dialogRef.close();
  }

}
