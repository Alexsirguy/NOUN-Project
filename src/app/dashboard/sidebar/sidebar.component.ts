import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { UiService } from '../../common/ui.service';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { DataService } from '../../common/data.service';

interface Iresponse {
  'email': string;
  'firstname': string;
  'lastname': string;
  'phone': string;
  'code': number;
  'message': string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isShowing = false;
  isExpanded = true;
  data;
  tutorRole = 2;
  adminRole = 1;
  studentRole = 3;
  APIURL = environment.APIURL;
  EXTERNALAPI = environment.EXTERNALAPI
  mobileQuery: MediaQueryList;
  controldisplay = false;
  profiledata;
  title: string;
  private _mobileQueryListener: () => void;
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
    private changeDetectorRef: ChangeDetectorRef, public mediaScreen: MediaObserver,
    public media: MediaMatcher, private uiService: UiService, private authService: AuthService,
    private httpClient: HttpClient, private Datatitle: DataService) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      this.closeSideNav();
    }

    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  @ViewChild('snav', {}) snav: MatSidenav;

  ngOnInit() {
    
    this.Datatitle.currentMessage.subscribe(
      data => this.title = data
    );

    this.Datatitle.sidebarStateObservable.subscribe((next)=>{

      if(next && next.closed){
        
        this.snav.close();
      }

    });

   

    this.authService.verifyRole(data => {
      this.data = data;

      this.onSuccess();
      this.closeSideNav();
    });

  }
  

  closeSideNav() {
    if (this.mobileQuery.matches) {
      this.snav.close();
    } else {
      this.snav.open();
    }
  }

  ngOnDestroy() {

    this.mobileQuery.removeListener(this._mobileQueryListener);

  }

  mouseenter() {

    if (!this.isExpanded) {
    
      this.isShowing = true;
    
    }

  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
