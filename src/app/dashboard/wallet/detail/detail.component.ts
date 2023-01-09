import { HttpRequest } from './../../../common/HttpRequest';
import { DataService } from 'src/app/common/data.service';
import { environment } from 'src/environments/environment.prod';
import { Validators, FormGroup } from '@angular/forms';
import { AuthService } from './../../../auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/common/ui.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  loginForm: FormGroup;
  paypalForm:FormGroup
  loginError = "";
  loading = false;
  loading2 = false
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
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private httpClient: HttpRequest,
    private uiService: UiService,
    private title: DataService) {
  }

  ngOnInit() {
    this.title.changeMessage("ACCOUNT DETAILS")
    this.buildLoginForm()
    this.getAccountDetails()
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      accountname: ["", [Validators.required]],
      accountnumber: ["", [Validators.required,Validators.maxLength(14)]],
      bankname: ["", [Validators.required]],
      country: ["", [Validators.required]],
    });

    this.paypalForm = this.formBuilder.group({
      email: ["",[Validators.required,Validators.email]]
    })
  }

  
  getAccountDetails() {
    this.onLoading()
    this.httpClient.get(`users/accountdetails/`)
      .then(response => {
        if (response.code === 1) {
          
          this.loginForm.patchValue({
            accountname: response.data.accountname,
            accountnumber: response.data.accountnumber,
            bankname: response.data.bankname,
            country: response.data.country
          });

          this.paypalForm.patchValue({
            email:response.data.email
          });

          this.onSuccess()
        } else {
          this.uiService.showToast(response.message)
          this.onFailure()
        }
      }).catch((error)=>{
        (this.uiService.showToast(error))
        this.onFailure()
      })
  }


  async bankUpdate(submittedForm: FormGroup) {
    if (submittedForm.valid) {
      this.loading = true
      this.httpClient
        .post(
          `users/accountdetails/`,
          submittedForm.value,
        )
        .then(
          data => {
            if (data.code === 1) {
              this.loading = false;
              this.uiService.showToast(data.message);
            } else {
              this.loading = false;
              this.uiService.showToast(data.message);
            }
          }).catch(
          error => {
            this.uiService.showToast('Cannot connect, check your internet connection and try again!')
            this.loading = false;
          }
        );
    } else {
      this.uiService.showToast('Some field are not valid. Please correct the error and try again!');
      this.loading = false;
    }
  }

  async paypalUpdate(submittedForm: FormGroup) {
    if (submittedForm.valid) {
      this.loading2 = true
      this.httpClient
        .post(
          `users/accountpaypal/`,
          submittedForm.value,
        )
        .then(
          data => {
            if (data.code === 1) {
              this.loading2 = false;
              this.uiService.showToast(data.message);
            } else {
              this.loading2 = false;
              this.uiService.showToast(data.message);
            }
          }).catch(
          error => {
            this.uiService.showToast('Cannot connect, check your internet connection and try again!')
            this.loading2 = false;
          }
        );
    } else {
      this.uiService.showToast('All form fields are required. Please fill the form completely and try again!');
      this.loading2 = false;
    }
  }

}
