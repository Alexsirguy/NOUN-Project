import { Role } from './../../auth/role.enum';
import { BookDetailsDialogComponent } from './../books/book-details-dialog/book-details-dialog.component';
import { HttpRequest } from './../../common/HttpRequest';
import { Router } from '@angular/router';
import { ChangeDetectRefComponent } from './../ChangeDetechRef';
import { UiService } from 'src/app/common/ui.service';
import { environment } from './../../../environments/environment.prod';
import { MatDialog} from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import {MatPaginator } from '@angular/material/paginator';
import { DataService } from './../../common/data.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { colors } from './../../common/calendar-colors';
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
import { UserBookingDetailDialogComponent } from '../books/user-booking-detail-dialog/user-booking-detail-dialog.component';
import { CourseSellingDailogComponent } from '../course-selling-dailog/course-selling-dailog.component';

export interface TransactionItem {
  meetinglink: string;
  date_: string;
  time_:string;
  created_at: string
}

const ELEMENT_DATA: TransactionItem[] = [

];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ChangeDetectRefComponent implements OnInit {
  FILEURL = environment.EXTERNALAPI + "files/";
  data;
  loader: boolean;
  success: boolean;
  failure: boolean;
  role = this.authService.getRole()
  studentRole = Role.Student
  onLoading() {
    this.loader = true;
    this.success = false;
    this.failure = false;
  }
  onSuccess() {
    this.loader = false;
    this.success = true;
    this.failure = false;
  }
  onFailure() {
    this.loader = false;
    this.success = false;
    this.failure = true;
  }
  displayedColumns: string[] = ["id", "date", "time", "view"];

  dataSource = new MatTableDataSource<TransactionItem>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(public media: MediaMatcher, private router: Router, private authService: AuthService, public changeDetectorRef: ChangeDetectorRef, private uiService: UiService, private httpClient: HttpRequest, private title: DataService, private dialog: MatDialog,
    ) {
      super(media, changeDetectorRef);
    }
    ngOnInit() {
      this.title.changeMessage("DASHBOARD")
      if(this.role == Role.Student){
        this.usergetTransaction();
      }else{
        this.getTransaction()
      }
      this.displayColumn()
    }

    onChangeDetected() {
      this.displayColumn();
    }

    displayColumn() {
      if (this.mobileQuery.matches) {
        this.displayedColumns =  ["id", "date", "time", "view"];
      } else if (this.tabletQuery.matches) {
        this.displayedColumns = ["id", "date", "time", "view"];
      } else {
        this.displayedColumns =  ["id", "date", "time", "view"];
      }
    }


    getTransaction() {
      this.onLoading()
      this.httpClient.get(`users/dashboard`).then(response => {
          if (response.code === 1) {
           
            this.dataSource = new MatTableDataSource<TransactionItem>(response.data.appointments);
            this.dataSource.paginator = this.paginator;
            this.data = response.data;
            
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
            console.log(this.events)
            this.onSuccess()
          } else {
            this.uiService.showToast(response.message)
            this.onFailure()
          }
        }).catch((error)=>{
          this.uiService.showToast(error)
          this.onFailure()
        })
    }

    usergetTransaction() {
      this.onLoading()
      this.httpClient.get(`users/userdashboard`).then(response => {
          if (response.code === 1) {
            this.dataSource = new MatTableDataSource<TransactionItem>(response.data.appointments);
            this.dataSource.paginator = this.paginator;
            this.data = response.data;
           
            this.data.events.forEach(element => {
              this.events.push({
                title: `You have a book session on ${element.date_} at ${element.time_}` ,
                start: addHours(startOfDay(new Date(element.date)), this.opentime(element.time_)),
                color:colors.red,
                actions: this.useractions,
                end: addHours(startOfDay(new Date(element.date)), this.opentime(element.time_)+1),
                meta: {
                  id: element.id
                },
              },)
            });  

            console.log(this.events)
            this.onSuccess()
          } else {
            this.uiService.showToast(response.message)
            this.onFailure()
          }
        }).catch((error)=>{
          this.uiService.showToast(error)
          this.onFailure()
        })
    }


    appointment(id){
      this.uiService.openDialogV2(BookDetailsDialogComponent, this.changeDetectorRef, {id:id }, (data) => {if(data){
        this.getTransaction();
      }});
    }

    userappointment(id){
      this.uiService.openDialogV2(UserBookingDetailDialogComponent, this.changeDetectorRef, {id:id }, (data) => {if(data){
       
      }});
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

    useractions: CalendarEventAction[] = [
      {
        label: '<i class="fa fa-eye"></i>',
        a11yLabel: 'View',
        onClick: ({ event }: { event: CalendarEvent }): void => {
        
          this.uiService.openDialogV2(UserBookingDetailDialogComponent, this.changeDetectorRef, {id:event.meta.id }, (data) => {  });
        },
      },
    ];
  
    handleEvent(title,event){
      if(this.role == Role.Student){
        this.uiService.openDialogV2(UserBookingDetailDialogComponent, this.changeDetectorRef, {id:event.meta.id }, (data) => { });
      }else{
        this.uiService.openDialogV2(BookDetailsDialogComponent, this.changeDetectorRef, {id:event.meta.id }, (data) => { });
      }
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

    startSelling(){
      this.uiService.openDialogV2(CourseSellingDailogComponent, this.changeDetectorRef, { }, (data) => {
       window.location.href = "http://"+data.url
       console.log(data.url)
       });
    }
   
  }
