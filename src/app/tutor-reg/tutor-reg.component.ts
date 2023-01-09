import { HttpRequest } from './../common/HttpRequest';
import { UiService } from './../common/ui.service';
import { AuthService } from './../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-reg',
  templateUrl: './tutor-reg.component.html',
  styleUrls: ['./tutor-reg.component.scss']
})
export class TutorRegComponent implements OnInit {
  regForm: FormGroup;
  loading:boolean = false
  redirectUrl;
  constructor(private form: FormBuilder, private route:ActivatedRoute, private router:Router, private authService: AuthService, private uiService:UiService, private http: HttpRequest) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      params => {this.redirectUrl = params.get("redirectUrl")
    });
    this.buildForm()
  }

  buildForm(){
    this.regForm = this.form.group({
      email:["",[Validators.required, Validators.email]],
      name:["",[Validators.required]],
      phone:["",[Validators.required]],
      password:["",[Validators.required]],
      confirmpassword:["",[Validators.required]],
      accounttype:["2",[Validators.required]],
    })
  }

  async register(){
   try{
     if(this.regForm.valid){
      this.loading = true
      const response = await this.http.post("accounts/register",this.regForm.value)
      if(response.code == 1){
       this.authService.login(response.data.token)
       if(this.authService.isAuthenticate()){
         if(this.redirectUrl){
           this.router.navigate([this.redirectUrl])
         }
         this.router.navigate([this.redirectUrl || "/dashboard/account/profile"])
       }
     }else{
       this.loading = true
       this.uiService.showToast(response.message)
     }
     }else{
      this.uiService.showToast("Kindly fill all the require form field")
     }
    
   }catch{
    this.uiService.showToast("An error has occured")
   }

  }

}
