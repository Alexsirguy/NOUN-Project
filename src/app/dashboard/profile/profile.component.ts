import { specialties } from './../../../environments/specialties';
import { ActivatedRoute } from '@angular/router';
import { BookDetailsDialogComponent } from './../books/book-details-dialog/book-details-dialog.component';
import { async } from '@angular/core/testing';
import { EditSubscriptionDialogComponent } from './../Subscriptions/edit-subscription-dialog/edit-subscription-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectRefComponent } from './../ChangeDetechRef';
import { colors } from './../../common/calendar-colors';
import { environment } from './../../../environments/environment.prod';
import { DataService } from './../../common/data.service';
import { AuthService } from './../../auth/auth.service';
import { UiService } from './../../common/ui.service';
import { HttpRequest } from './../../common/HttpRequest';
import { CreateSubscriptionDialogComponent } from '../Subscriptions/create-subscription-dialog/create-subscription-dialog.component';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

export interface SubscriptionItem {
  title: string;
  amount: number;
  duration: string;
}

const ELEMENT_DATA: SubscriptionItem[] = [

];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss','./extrastyle.scss']
})
export class ProfileComponent extends ChangeDetectRefComponent implements OnInit {

  constructor(private fb:FormBuilder, private route:ActivatedRoute, private title:DataService, public media: MediaMatcher, public changeDetectorRef: ChangeDetectorRef, private http:HttpRequest, private uiService:UiService,private authService:AuthService) { 
    super(media, changeDetectorRef);
  }

  specialties = specialties

  displayedColumns: string[] = ["id", "title",'amount', "duration", "view"];
  dataSource = new MatTableDataSource<SubscriptionItem>(ELEMENT_DATA);

  mprofile:FormGroup
  profile:FormGroup
  avatar;
  data;

  loading: boolean;

  loader:boolean;
  success: boolean;
  failure: boolean;

  activeTab = 0;
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

  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  displayColumn() {
    if (this.mobileQuery.matches) {
      this.displayedColumns = ['amount', "view"];
    } else if (this.tabletQuery.matches) {
      this.displayedColumns = ["id", "title",'amount', "duration", "view"];
    } else {
      this.displayedColumns = ["id", "title",'amount', "duration", "view"];
    }
  }

  @ViewChild('cover', {}) coverRef: ElementRef;

  ngOnInit(): void {
    this.title.changeMessage("PROFILE")
    this.buildForm()
    this.displayColumn();
    this.getProfile()

    this.route.queryParamMap.subscribe(
      params => {this.activeTab = parseInt(params.get("activeTab"))
    });
    if(!this.activeTab){
      this.activeTab = 0
    }
    
  }

  objectKeys(data){
    return Object.keys(data);
  }
  opentime(open) {
    let openval;
    if (open.includes('PM')) {
      openval = open.substring(0, 2);
      openval = parseInt(openval) + 12
    } else {
      openval = open.substring(0, 2);
      openval = parseInt(openval)
      if(openval == 12){
        openval - 12
      }
    }
    return openval;
  }
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-eye"></i>',
      a11yLabel: 'View',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      
        this.uiService.openDialogV2(BookDetailsDialogComponent, this.changeDetectorRef, {id:event.meta.id }, (data) => {  });
      },
    },
  ];

  handleEvent(title,event){
  
    this.uiService.openDialogV2(BookDetailsDialogComponent, this.changeDetectorRef, {id:event.meta.id }, (data) => { });
  }


  refresh: Subject<any> = new Subject();


  events: CalendarEvent[] = [
   
  ];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
 
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
 
  

  buildForm(){
    this.mprofile = this.fb.group({
      fullname: ["",[Validators.required]],
      gender: ["",[]],
      qualification: ["",[Validators.required]],
      phone: ["",[Validators.required]],
      dob: ["",[]],
      specialty: ["",[Validators.required]],
      category: ["",[Validators.required]],
      rate: ["",[Validators.required]],
      bio: ["",[Validators.required]],
      currency:["",[Validators.required]],
      file:[null,[]],
      filename:["",[]]
    })
    this.profile = this.fb.group({
      fullname: ["",[Validators.required]],
      gender: ["",[]],
      qualification: ["",[Validators.required]],
      phone: ["",[Validators.required]],
      dob: ["",[]],
      specialty: ["",[Validators.required]],
      rate: ["",[Validators.required]],
      category: ["",[Validators.required]],
      bio: ["",[Validators.required]],
      currency:["",[Validators.required]],
      file:[null,[]],
      filename:["",[]]
    })
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profile.patchValue({
          file: reader.result,
          filename: file.name
        });

        this.mprofile.patchValue({
          file: reader.result,
          filename: file.name
        });

        this.coverRef.nativeElement.src = reader.result;
        // need to run CD since file load runs outside of zone
        // this.cd.markForCheck();
      };
    }
  }


  updateProfile(form:FormGroup){
    if(form.valid){
      this.loading = true
      this.http.post("users/profile",form.value).then((data)=>{
        if(data.code == 1){
          this.uiService.showToast(data.message)
          this.loading = false
        }else{
          this.uiService.showToast(data.message)
          this.loading = false
        }      
      }).catch((error)=>{
        this.uiService.showToast("Network error. Please check your network and try again!")
        this.loading = false
      }) 
    } else{
      this.uiService.showToast("Kindly correct the error in form field")
    }
  }

  getProfile(){
    this.onLoading()
    this.http.get("users/profile").then((data)=>{
    this.data = data.data
    this.avatar = data.data.user.avatar
    
    this.profile.patchValue({
      fullname: data.data.user.fullname,
      dob: new Date(data.data.user.dob),
      phone: data.data.user.phone,
      gender: data.data.user.gender,
      qualification: data.data.profile?.qualification,
      specialty: data.data.profile?.specialty,
      category:data.data.profile?.category,
      rate: data.data.profile?.rate,
      currency:data.data.profile?.currency,
      bio: data.data.profile?.bio
    });

    this.mprofile.patchValue({
      fullname: data.data.user.fullname,
      dob: new Date(data.data.user.dob),
      phone: data.data.user.phone,
      gender: data.data.user.gender,
      qualification: data.data.profile?.qualification,
      category:data.data.profile?.category,
      specialty: data.data.profile?.specialty,
      currency:data.data.profile?.currency,
      rate: data.data.profile?.rate,
      bio: data.data.profile?.bio
    });
    this.avatar = `${environment.EXTERNALAPI}files/${data.data.user.avatar}`
    this.dataSource = new MatTableDataSource<SubscriptionItem>(data.data.subscriptions);
    this.dataSource.paginator = this.paginator;

    this.data.events.forEach(element => {
      this.events.push({
        title: `You have a book session on ${element.date_} at ${element.time_}` ,
        start: addHours(startOfDay(new Date(element.date)), this.opentime(element.time_)),
        color:colors.red,
        actions: this.actions,
        end: addHours(startOfDay(new Date(element.date)), this.opentime(element.time_)+1),
        meta: {
          id: element.id
        },
      },)
    });  
  
    this.onSuccess()
  }).catch((error)=>{
   
    this.onFailure()
  })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  createSubscription(){
    this.uiService.openDialogV2(CreateSubscriptionDialogComponent, this.changeDetectorRef, { }, (data) => { if(data){this.getProfile()} });
  }

  updateSubscription(id){
    this.uiService.openDialogV2(EditSubscriptionDialogComponent, this.changeDetectorRef, {id:id}, (data) => { if(data){this.getProfile()} });
  }

  deleteSubscription(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Please confirm you want to delete this subscription plan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, Cancel'
    }).then((result) => {
      if (result.value) {

        this.http.delete(`users/subscription/${id}`).then((data)=>{
          if(data.code == 1){
            this.uiService.showToast(data.message)
            this.getProfile();
          }else{
            this.uiService.showToast(data.message)
          }
        }).catch((error)=>{
         this.uiService.showToast("Network Error! Please try again.") 
        })  
     
      } 
    })
  }
}
