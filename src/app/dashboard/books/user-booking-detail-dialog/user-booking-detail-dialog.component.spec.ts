import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingDetailDialogComponent } from './user-booking-detail-dialog.component';

describe('UserBookingDetailDialogComponent', () => {
  let component: UserBookingDetailDialogComponent;
  let fixture: ComponentFixture<UserBookingDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookingDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
