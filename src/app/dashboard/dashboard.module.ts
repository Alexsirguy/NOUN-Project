import { EmptyDataComponent } from './../components/empty-data/empty-data.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { DataService } from './../common/data.service';
import { AuthHttpInterceptor } from './../auth/auth-http-interceptor';
import { HttpRequest } from './../common/HttpRequest';
import { UiService } from './../common/ui.service';
import { AuthService } from './../auth/auth.service';
import { environment } from './../../environments/environment';
import { MaterialModule } from './../material.module';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProfileComponent } from './profile/profile.component'; 
import { LoadingComponent } from './../components/loading/loading.component';
import { LottieModule } from 'ngx-lottie';
import { NeworkFailureComponent } from './../components/nework-failure/nework-failure.component';
import { CreateSubscriptionDialogComponent } from './Subscriptions/create-subscription-dialog/create-subscription-dialog.component';
import { EditSubscriptionDialogComponent } from './Subscriptions/edit-subscription-dialog/edit-subscription-dialog.component';
import { TransactionComponent } from './wallet/transaction/transaction.component';
import { PayoutComponent } from './wallet/payout/payout.component';
import { DetailComponent } from './wallet/detail/detail.component';
import { BookDetailsDialogComponent } from './books/book-details-dialog/book-details-dialog.component';
import { AppointmentsComponent } from './books/appointments/appointments.component';
import { BookingsComponent } from './books/bookings/bookings.component';
import { UserBookingDetailDialogComponent } from './books/user-booking-detail-dialog/user-booking-detail-dialog.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { CourseSellingDailogComponent } from './course-selling-dailog/course-selling-dailog.component';
@NgModule({
  declarations: [DashboardComponent, EmptyDataComponent, NeworkFailureComponent, LoadingComponent, SidebarComponent, HomeComponent, ProfileComponent, CreateSubscriptionDialogComponent, EditSubscriptionDialogComponent, TransactionComponent, PayoutComponent, DetailComponent, BookDetailsDialogComponent, AppointmentsComponent, BookingsComponent, UserBookingDetailDialogComponent, StudentprofileComponent, CourseSellingDailogComponent],
  imports: [
    LottieModule,
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    LazyLoadImageModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  entryComponents:[SidebarComponent,CreateSubscriptionDialogComponent],
  providers: [AuthService, UiService, HttpRequest, DataService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  }],
})
export class DashboardModule { }
