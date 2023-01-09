import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Role } from "../auth/role.enum";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient} from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { UiService } from '../common/ui.service'
import { JwtHelperService } from "@auth0/angular-jwt";

interface LogResponse {
  code: number;
  message: string;
  token: string;
  role: Role;
  status: string;
}
@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {
  loginError = "";
  loading = false;
  redirectUrl;
  role
  helper = new JwtHelperService();
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private uiService: UiService) {
      route.paramMap.subscribe(
        params => (this.redirectUrl = params.get("redirectUrl"))
      );
     }

  ngOnInit() {
    this.authService.logout(); 
    this.route.paramMap.subscribe(
      params => {
        this.login(params.get("id"));
      }
    );
  }
  

  async login(id) {
    this.loading = true
    this.httpClient
      .get<LogResponse>(
        `${environment.APIURL}accounts/authenticate/${id}`,
      )
      .subscribe(
        data => {
          if (data.code === 1) {
            this.authService.login(data.token);
            this.role = this.helper.decodeToken(data.token).role
            this.actionLogin(this.role);
          } else {
            this.loading = false;
            this.uiService.showToast(data.message);
            this.router.navigate(["/login"])
          }
        },
        error => {
          this.uiService.showToast('An error was trigger by the client')
          this.loading = false;
        }
      );
  }

  actionLogin(role){
    if(role ==1){
     this.router.navigate(["/dashboard/home"])
    }else if(role == 2){
     this.router.navigate(["/dashboard/stats"])
    }else if(role == 3){
     this.router.navigate(["/dashboard/catalogs"])
    } 
   }
}
