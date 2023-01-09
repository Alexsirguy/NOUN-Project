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

export interface TransactionItem {
  description: string;
  user: any;
  expert: any;
  date: string;
  amount:number,
  currency:number
}

const ELEMENT_DATA: TransactionItem[] = [

];
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent extends ChangeDetectRefComponent implements OnInit {
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
  displayedColumns: string[] = ["id", "amount", "description",'date'];

  dataSource = new MatTableDataSource<TransactionItem>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(public media: MediaMatcher, private router: Router, private authService: AuthService, public changeDetectorRef: ChangeDetectorRef, private uiService: UiService, private httpClient: HttpRequest, private title: DataService, private dialog: MatDialog,
    ) {
      super(media, changeDetectorRef);
    }
    ngOnInit() {
      this.title.changeMessage("TRANSACTIONS")
      this.getTransaction()
      this.displayColumn()
    }
    onChangeDetected() {
      this.displayColumn();
    }
    displayColumn() {
      if (this.mobileQuery.matches) {
        this.displayedColumns = ["amount", 'description'];
      } else if (this.tabletQuery.matches) {
        this.displayedColumns = ["id", "amount", "description",'date'];
      } else {
        this.displayedColumns = ["id", "amount", "description",'date'];
      }
    }

    getTransaction() {
      this.onLoading()
      this.httpClient.get(`users/transactions/`).then(response => {
          if (response.code === 1) {
            this.dataSource = new MatTableDataSource<TransactionItem>(response.data.transactions);
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
  }
