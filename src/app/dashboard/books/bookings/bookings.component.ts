import { BookDetailsDialogComponent } from './../book-details-dialog/book-details-dialog.component';
import { HttpRequest } from './../../../common/HttpRequest';
import { Router } from '@angular/router';
import { ChangeDetectRefComponent } from './../../ChangeDetechRef';
import { UiService } from 'src/app/common/ui.service';
import { environment } from './../../../../environments/environment.prod';
import { MatDialog} from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import {MatPaginator } from '@angular/material/paginator';
import { DataService } from './../../../common/data.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserBookingDetailDialogComponent } from '../user-booking-detail-dialog/user-booking-detail-dialog.component';

export interface TransactionItem {
  meetinglink: string;
  date_: string;
  time_:string;
  created_at: string
}

const ELEMENT_DATA: TransactionItem[] = [

];
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent extends ChangeDetectRefComponent implements OnInit {
  FILEURL = environment.EXTERNALAPI + "files/";
  data: any[] = [];
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
  displayedColumns: string[] = ["id", "date", "time", "where", 'datebooked',"view"];

  dataSource = new MatTableDataSource<TransactionItem>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(public media: MediaMatcher, private router: Router, private authService: AuthService, public changeDetectorRef: ChangeDetectorRef, private uiService: UiService, private httpClient: HttpRequest, private title: DataService, private dialog: MatDialog,
    ) {
      super(media, changeDetectorRef);
    }
    ngOnInit() {
      this.title.changeMessage("APPOINTMENTS")
      this.getTransaction()
      this.displayColumn()
    }

    onChangeDetected() {
      this.displayColumn();
    }

    displayColumn() {
      if (this.mobileQuery.matches) {
        this.displayedColumns =  ["id", "date", "time", "view"];
      } else if (this.tabletQuery.matches) {
        this.displayedColumns = ["id", "date", "time", "where", 'datebooked',"view"];
      } else {
        this.displayedColumns =  ["id", "date", "time", "where", 'datebooked',"view"];
      }
    }


    getTransaction() {
      this.onLoading()
      this.httpClient.get(`users/bookings`).then(response => {
          if (response.code === 1) {
            this.dataSource = new MatTableDataSource<TransactionItem>(response.data);
            this.dataSource.paginator = this.paginator;
            this.data = response.data;
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
      this.uiService.openDialogV2(UserBookingDetailDialogComponent, this.changeDetectorRef, {id:id }, (data) => { });
    }
  }

