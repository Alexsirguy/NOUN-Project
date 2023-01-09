import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, ViewChild, Injectable } from '@angular/core';


@Injectable({
  providedIn: "root"
})

export class ChangeDetectRefComponent implements OnInit {
  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  private _tabletQueryListener: () => void;
  constructor(public media: MediaMatcher, public changeDetectorRef: ChangeDetectorRef
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.tabletQuery = media.matchMedia('(max-width: 980px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      this.onChangeDetected();
     
    }
    this._tabletQueryListener = () => {
      changeDetectorRef.detectChanges();
      this.onChangeDetected();
     
    }
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.tabletQuery.addListener(this._tabletQueryListener);
  }
  ngOnInit() {
  
  }
  onChangeDetected(){
   
  }
 
  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.tabletQuery.removeListener(this._tabletQueryListener);
  }
}
