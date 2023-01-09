import { environment } from 'src/environments/environment.prod';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpRequest } from './../common/HttpRequest';
import { UiService } from './../common/ui.service';
import { PaymentInstance } from 'angular-rave';
import { RaveOptions } from 'angular-rave';
@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss']
})
export class ExpertComponent implements OnInit {
  data
  minDate = new Date()
  selectedDate;
  FILEURL = `${environment.EXTERNALAPI}files/`
  id
  loading:boolean;
  commentForm:FormGroup
  morning = ["8 AM", "9 AM", "10 AM", "11 AM"]
  afternoon = ["12 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"]
  timezone = ""
  block = []

  selectedTime = [];

  loader: boolean;
  success: boolean;
  failure: boolean;
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

  bookingLoader: boolean;
  bookingSuccess: boolean;
  bookingFailure: boolean;
  onBookingLoading() {
    this.bookingLoader = true;
    this.bookingSuccess = false;
    this.bookingFailure = false;
  }
  onBookingSuccess() {
    this.bookingLoader = false;
    this.bookingSuccess = true;
    this.bookingFailure = false;
  }
  onBookingFailure() {
    this.bookingLoader = false;
    this.bookingSuccess = false;
    this.bookingFailure = true;
  }

  generateReference(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

paymentInstance: PaymentInstance;

paymentOptions: RaveOptions = {
  PBFPubKey: environment.FLUTTERWAVEKEY,
  customer_email: this.authService.getEmail(),
  customer_firstname: '',
  customer_lastname: '',
  custom_description: 'Payment for booking expert',
  amount: 0,
  currency:"NGN",
  customer_phone: '',
  txref: this.generateReference(),
}

 constructor(private router:Router, private fb:FormBuilder, private authService:AuthService, private uiService: UiService, private route: ActivatedRoute, public http: HttpRequest) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.id = data.get("id");
      this.getTutor(this.id)
    });
    this.commentForm = this.fb.group({
      comment:["",[]]
    })
  }

  schedule(event) { 
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(new Date().getTimezoneOffset())
    console.log(this.timezone)
    this.selectedDate = new Date(event).toDateString() 
    console.log(this.selectedDate)
    this.selectedTime = [];
    this.getBooking(this.id,this.selectedDate,this.timezone)
  }

  retrySchedule(){
   this.schedule(this.selectedDate)  
  }

  tooltip(time) {
    if (this.block.includes(time)) {
      return "Slot already booked"
    }
    return ""
  }

  inactive(time) {
    if (this.block.includes(time)) {
      return true
    }
    return false
  }

  passTime(time) {
    const today = new Date(new Date().toDateString()).getTime();
    const dateSelected = new Date(this.selectedDate).getTime();
    const offset = new Date().getTimezoneOffset();
    const now = new Date().getUTCHours() == 23 ? 0 : new Date().getUTCHours() - (offset / 60);
    let currentTime;
    if (now == 0) {
      currentTime = 24;
    }
    currentTime = now;
    let checktime = time.split(" ")
    if (checktime[1] == "PM") {
      if(checktime[0] != 12){
        checktime[0] = parseInt(checktime[0]) + 12;
      }  
    }
    if(checktime[0] <= currentTime && dateSelected == today){
      return true
    }
    return false
  }

  onTimeSelect(time) {
    if(this.selectedTime.includes(time)){
      const index = this.selectedTime.indexOf(time);
      if (index > -1) {
        this.selectedTime.splice(index, 1);
      }
    }else{
      this.selectedTime.push(time)  
    }

    this.paymentOptions.customer_email = this.authService.getEmail()
    this.paymentOptions.amount = this.selectedTime.length * this.data.expert.rate 
  }

  isSelected(time){
    if(this.selectedTime.includes(time)){
      return true
    }
    return false
  }

  getTutor(id) {
    this.onLoading()
    this.http.get(`accounts/tutor/${id}`).then((data) => {
      if (data.code == 1) {
        this.data = data.data
       this.paymentOptions.currency = data.data.expert.currency
        
        this.onSuccess()
      } else {
        this.uiService.showToast(data.message)
        this.onFailure()
      }
    }).catch((error) => {
      this.onFailure()
      this.uiService.showToast("Network Error! Please try again.")
    })
  }

  getBooking(userid,date,timezone) {
    this.onBookingLoading()
    this.http.post(`users/activebooking`,{userid:userid,date:date,timezone:timezone}).then((data) => {
      if (data.code == 1) {
        this.block = data.data
        this.onBookingSuccess()
      } else {
        this.uiService.showToast(data.message)
        this.onBookingFailure()
      }
    }).catch((error) => {
      this.onBookingFailure()
      this.uiService.showToast("Network Error! Please try again.")
    })
  }
   
  paymentFailure() {
    console.log('Payment Failed');
  }
 
  paymentSuccess(res) {
    console.log(res)
    this.paymentInstance.close();
    this.loading = true
    this.http.post("users/book",{
      expert:this.id,
      date:this.selectedDate,
      time: this.selectedTime,
      payment: res,
      rate:this.data.expert.rate,
      comment:this.commentForm.value.comment
    }).then((data)=>{
      if(data.code == 1){
        //this.router.navigate(["/dashboard/home"])  
        //location.href = "/dashboard/home"
        this.uiService.showToast(data.message)
        this.loading = false
      }else{
        location.reload()
        this.uiService.showToast(data.message)
        this.loading = false
      }
     
    }).catch((error)=>{
      this.loading = false;
      this.ngOnInit()
      this.uiService.showToast("We could not confirm your booking at the moment.")
    })
   
  }

  onclosePayment(event){
    console.log(event)
    if(event){
      this.loading = true
      this.http.post("users/book",{
        expert:this.id,
        date:this.selectedDate,
        time: this.selectedTime,
        payment: event.tx,
        rate:this.data.expert.rate,
        comment:this.commentForm.value.comment
      }).then((data)=>{
        if(data.code == 1){
          //this.router.navigate(["/dashboard/home"])  
          //location.href = "/dashboard/home"
          this.uiService.showToast(data.message)
          this.loading = false
        }else{
         // location.reload()
          this.uiService.showToast(data.message)
          this.loading = false
        }
       
      }).catch((error)=>{
        this.loading = false;
        this.ngOnInit()
        this.uiService.showToast("We could not confirm your booking at the moment.")
      })
    }
  
  }
 
  paymentInit(paymentInstance) {
    this.paymentFailure = paymentInstance;
    this.loading = true
    //console.log('Payment about to begin', paymentInstance);
  }
}
