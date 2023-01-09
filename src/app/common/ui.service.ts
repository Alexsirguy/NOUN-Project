import { MediaObserver } from '@angular/flex-layout';
import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, Component, Inject, ChangeDetectorRef, OnInit } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

import { MatDialog,
  MatDialogConfig} from '@angular/material/dialog'
  
import { Observable } from 'rxjs';

@Injectable()
export class UiService {
  mobileQuery: MediaQueryList;
  private dialogRef: any;
  private _mobileQueryListener: () => void;
  constructor(public mediaScreen: MediaObserver,
    public media: MediaMatcher, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      // changeDetectorRef.detectChanges();
    }

    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  showToast(message: string, action = 'Close', config?: MatSnackBarConfig) {
    this.snackBar.open(
      message,
      action,
      config || {
        duration: 7000,
      }
    );
  }

  openDialog(component, detectorRef, data, callable) {


    if (detectorRef != null) {
      this._mobileQueryListener = () => {
        detectorRef.detectChanges();
        if (this.dialogRef != null) {
          if (this.mobileQuery.matches) {
            this.dialogRef.updateSize("100vw", "100vh");
          }

          else {
            this.dialogRef.updateSize('600px', 'auto');
          }
        }
      }

      this.mobileQuery.removeListener(this._mobileQueryListener);

      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    if (this.mobileQuery.matches) {
      this.dialogRef = this.dialog.open(component, {
        width: '100vw', //we can use breakpoint observer or media query to customize width of dialog here.
        height: '100vh',
        maxWidth: 'none',
        data: { data: data }
      });
      this.dialogRef.afterClosed().subscribe(result => {
        if(result)
        callable(result);
      });
    }
    else {
      this.dialogRef = this.dialog.open(component, {
        width: '600px', //we can use breakpoint observer or media query to customize width of dialog here.
        maxWidth:'100vw',
        data: { data: data }
      });

      this.dialogRef.afterClosed().subscribe(result => {
        if(result)
        callable(result);
      });
    }
  }

  openDialogV2(component, detectorRef, data, callable, containerClass="") {

    if (detectorRef != null) {
      this._mobileQueryListener = () => {
        detectorRef.detectChanges();
        if (this.dialogRef != null) {
          if (this.mobileQuery.matches) {
            this.dialogRef.updateSize("100vw", "100vh");
          }

          else {
            this.dialogRef.updateSize('600px', 'auto');
          }
        }
      }

      this.mobileQuery.removeListener(this._mobileQueryListener);

      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    if (this.mobileQuery.matches) {
      this.dialogRef = this.dialog.open(component, {
        width: '100vw', //we can use breakpoint observer or media query to customize width of dialog here.
        height: '100vh',
        maxWidth: 'none',
        panelClass:containerClass,
        data: data,
      });
      this.dialogRef.afterClosed().subscribe(result => {
        if(result)
        callable(result);
      });
    }
    else {
      this.dialogRef = this.dialog.open(component, {
        width: '600px', //we can use breakpoint observer or media query to customize width of dialog here.
        maxWidth:'100vw',
        panelClass:containerClass,
        data: data,
      });

      this.dialogRef.afterClosed().subscribe(result => {
        if(result)
        callable(result);
      });
    }
  }


  openLargeDialog(component, detectorRef, data, callable, containerClass="rounded-dialog") {

    if (detectorRef != null) {
      this._mobileQueryListener = () => {
        detectorRef.detectChanges();
        if (this.dialogRef != null) {
          if (this.mobileQuery.matches) {
            this.dialogRef.updateSize("100vw", "100vh");
          }

          else {
            this.dialogRef.updateSize('820px', 'auto');
          }
        }
      }

      this.mobileQuery.removeListener(this._mobileQueryListener);

      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    if (this.mobileQuery.matches) {
      this.dialogRef = this.dialog.open(component, {
        width: '100vw', //we can use breakpoint observer or media query to customize width of dialog here.
        height: '100vh',
        maxWidth: 'none',
        panelClass:containerClass,
        data: data,
      });
      this.dialogRef.afterClosed().subscribe(result => {
        if(result)
        callable(result);
      });
    }
    else {
      this.dialogRef = this.dialog.open(component, {
        width: '820px', //we can use breakpoint observer or media query to customize width of dialog here.
        maxWidth:'100vw',
        panelClass:containerClass,
        data: data,
      });

      this.dialogRef.afterClosed().subscribe(result => {
        if(result)
        callable(result);
      });
    }
  }


}
