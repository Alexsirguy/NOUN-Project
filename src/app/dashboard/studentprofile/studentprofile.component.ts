import { HttpRequest } from './../../common/HttpRequest';
import { DataService } from 'src/app/common/data.service';
import { environment } from 'src/environments/environment.prod';
import { Validators, FormGroup } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UiService } from 'src/app/common/ui.service';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.scss']
})
export class StudentprofileComponent implements OnInit {
  loginForm: FormGroup;
  loginError = "";
  loading = false;
  avatar = "/assets/images/avatar.png";
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
  @ViewChild('cover', {}) coverRef: ElementRef;
  ngOnInit() {
    this.title.changeMessage("PROFILE")
    this.buildLoginForm()
    this.onLoading();
    this.authService.verifyRole(data => {
      this.loginForm.patchValue({
        fullname: data.user.fullname,
        phone: data.user.phone,
        gender: data.user.gender,
        dob: new Date(data.user.dob),
        address:data.user.address
      })
      this.avatar = `${environment.EXTERNALAPI}files/${data.user.avatar}`
      this.onSuccess();
    });
  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.loginForm.patchValue({
          file: reader.result,
          filename: file.name
        });
        this.coverRef.nativeElement.src = reader.result;
        // need to run CD since file load runs outside of zone
        // this.cd.markForCheck();
      };
    }
  }
  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      fullname: ["", [Validators.required]],
      phone: ["", []],
      gender: ["", []],
      dob: ["", []],
     
      file: [null,[]],
      filename:["",[]]
    });
  }
  async login(submittedForm: FormGroup) {
    if (submittedForm.valid) {
      this.loading = true
      this.httpClient
        .post(
          `users/update`,
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
      this.uiService.showToast('All form fields are required. Please fill the form completely and try again!');
      this.loading = false;
    }
  }
}
