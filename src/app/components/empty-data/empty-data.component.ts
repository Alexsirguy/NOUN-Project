import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent implements OnInit {

  constructor() { }
  @Output()
  retry = new EventEmitter<any>();


  @Input() message : string = "This place looks empty";

  @Input() title: string = "No data available!";

  @Input() actionTitle = "TRY AGAIN";

  @Input() showAction: boolean = true;

  @Input() showImage: boolean = true;


  ngOnInit() {
   
  }

  runRetry(){
    this.retry.emit('complete');
  }

}


@Component({
  selector: 'app2-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent2 implements OnInit {

  constructor() { }
  @Output()
  retry = new EventEmitter<any>();


  @Input() message : string = "This place looks empty";

  @Input() title: string = "No data available!";

  @Input() actionTitle = "TRY AGAIN";

  @Input() showAction: boolean = true;

  @Input() showImage: boolean = true;


  ngOnInit() {
   
  }

  runRetry(){
    this.retry.emit('complete');
  }

}