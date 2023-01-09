import { HttpRequest } from './../common/HttpRequest';
import { UiService } from './../common/ui.service';
import { AuthService } from './../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
    this.loginForm = this.form.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required]],
    })
  }

  async login(){
   try{
     if(this.loginForm.valid){
      this.loading = true
      const response = await this.http.post("accounts/login",this.loginForm.value)
     if(response.code == 1){
       this.authService.login(response.data.token)
       if(this.authService.isAuthenticate()){
         console.log(this.redirectUrl)
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
      this.uiService.showToast("Kindly fill all the require form field")
     }
    
   }catch(e){
     console.log(e)
    this.loading = false
    this.uiService.showToast("An error has occured")
   }

  }


}
