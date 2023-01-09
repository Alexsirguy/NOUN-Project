import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { BookingsComponent } from './books/bookings/bookings.component';
import { AppointmentsComponent } from './books/appointments/appointments.component';
import { DetailComponent } from './wallet/detail/detail.component';
import { PayoutComponent } from './wallet/payout/payout.component';
import { TransactionComponent } from './wallet/transaction/transaction.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './../auth/auth-guard.services';
import { Role } from './../auth/role.enum';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '', component: DashboardComponent, children: [
    { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
    {
      path: 'home', component: HomeComponent , canActivate: [AuthGuard],
      data: {
       expectedRole: Role.Student,
      }, 
    }, 
    {
      path: 'appointments', component: AppointmentsComponent , canActivate: [AuthGuard],
      data: {
       expectedRole: Role.Tutor,
      }, 
    },
    {
      path: 'bookings', component: BookingsComponent , canActivate: [AuthGuard],
      data: {
       expectedRole: Role.Student,
      }, 
    }, 
    {
      path: 'account/profile', component: ProfileComponent , canActivate: [AuthGuard],
      data: {
       expectedRole: Role.Tutor,
      }, 
    }, 
    {
      path: 'account/details', component: StudentprofileComponent , canActivate: [AuthGuard],
      data: {
       expectedRole: Role.Student,
      }, 
    }, 
    {
      path: 'wallets/transactions', component: TransactionComponent , canActivate: [AuthGuard],
      data: {
       expectedRole: Role.Tutor,
      }, 
    }, 
    {
      path: 'wallets/payouts', component: PayoutComponent , canActivate: [AuthGuard],
      data: {
       expectedRole: Role.Tutor,
      }, 
    },
    {
      path: 'wallets/details', component: DetailComponent , canActivate: [AuthGuard],
      data: {
       expectedRole: Role.Tutor,
      }, 
    },  
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
