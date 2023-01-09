import { HttpRequest } from './../../../common/HttpRequest';
import { Router } from '@angular/router';
import { ChangeDetectRefComponent } from './../../ChangeDetechRef';
import { HttpClient } from '@angular/common/http';
import { UiService } from 'src/app/common/ui.service';
import { environment } from './../../../../environments/environment.prod';
import { DataService } from './../../../common/data.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import {MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

export interface TransactionItem {
  date: string;
  amount:number,
  currency:string
}

const ELEMENT_DATA: TransactionItem[] = [

];
@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss']
})
export class PayoutComponent extends ChangeDetectRefComponent implements OnInit {
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
  displayedColumns: string[] = ["id", "amount",'date'];
  dataSource = new MatTableDataSource<TransactionItem>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(public media: MediaMatcher, private router: Router, private authService: AuthService, public changeDetectorRef: ChangeDetectorRef, private uiService: UiService, private httpClient: HttpRequest, private title: DataService, private dialog: MatDialog,
    ) {
      super(media, changeDetectorRef);
    }
    ngOnInit() {
      this.title.changeMessage("PAYOUTS")
      this.getPayout()
      this.displayColumn()
    }
    onChangeDetected() {
      this.displayColumn();
    }
    displayColumn() {
      if (this.mobileQuery.matches) {
        this.displayedColumns = ["id", "amount"];
      } else if (this.tabletQuery.matches) {
        this.displayedColumns = ["id","amount",'date'];
      } else {
        this.displayedColumns = ["id", "amount", 'date'];
      }
    }

    getPayout() {
      this.onLoading()
      this.httpClient.get(`users/transactions/`)
        .then(response => {
          if (response.code === 1) {
            this.dataSource = new MatTableDataSource<TransactionItem>(response.data.payouts);
            this.dataSource.paginator = this.paginator;
            this.data = response.data;
            this.onSuccess()
          } else {
            this.uiService.showToast(response.message)
            this.onFailure()
          }
        }).catch(
          error => {
            (this.uiService.showToast(error))
            this.onFailure()
          }
        )
    }
  }