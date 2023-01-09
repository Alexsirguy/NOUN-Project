import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { UiService } from './../common/ui.service';
import { HttpRequest } from './../common/HttpRequest';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      accounttype:["3",[Validators.required]],
    })
  }

  async register(){
   try{
     if(this.regForm.valid){
      this.loading = true
      const response = await this.http.post("/accounts/register",this.regForm.value)
     if(response.code == 1){
       this.authService.login(response.data.token)
       if(this.authService.isAuthenticate()){
         if(this.redirectUrl){
           this.router.navigate([this.redirectUrl])
         }
         this.router.navigate([this.redirectUrl || "/dashboard/home"])
       }
     }else{
       this.loading = false
       this.uiService.showToast(response.message)
     }
     }else{
      this.loading = false
      this.uiService.showToast("Kindly fill all the require form field")
     }
    
   }catch{
    this.loading = false
    this.uiService.showToast("An error has occured")
   }

  }

}
