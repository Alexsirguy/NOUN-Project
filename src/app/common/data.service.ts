import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('CLIQUE');
  currentMessage = this.messageSource.asObservable();

  private sideBarStateSource = new BehaviorSubject(null);

  sidebarStateObservable = this.sideBarStateSource.asObservable();


  constructor() { }

  changeMessage(message: string) {
  
    this.messageSource.next(message)
  
  }

  updateSidebarState(message) {
  
    this.sideBarStateSource.next(message)
  
  }


}
