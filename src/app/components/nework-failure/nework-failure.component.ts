import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-nework-failure',
  templateUrl: './nework-failure.component.html',
  styleUrls: ['./nework-failure.component.scss']
})
export class NeworkFailureComponent implements OnInit {
  constructor() { }
  @Output()
  retry = new EventEmitter<any>();

  @Input() title: string = "Network Error!"; 

  @Input() message: string = "Please check your internet and try again.";

  @Input() actionTitle : string = "TRY AGAIN";

  @Input() showActionTitle : boolean = true;

  @Input() showImage : boolean = true;

  
  ngOnInit() {
   
  }

  runRetry(){
    this.retry.emit('complete');
  }

}



@Component({
  selector: 'app2-nework-failure',
  templateUrl: './nework-failure.component.html',
  styleUrls: ['./nework-failure.component.scss']
})
export class NeworkFailureComponent2 implements OnInit {
  constructor() { }
  @Output()
  retry = new EventEmitter<any>();

  @Input() title: string = "Network Error!"; 

  @Input() message: string = "Please check your internet and try again.";

  @Input() actionTitle : string = "TRY AGAIN";
  @Input() showActionTitle : boolean = true;
  @Input() showImage : boolean = true;
  
  ngOnInit() {
   
  }

  runRetry(){
    this.retry.emit('complete');
  }

}