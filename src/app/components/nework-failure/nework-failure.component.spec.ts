import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeworkFailureComponent } from './nework-failure.component';

describe('NeworkFailureComponent', () => {
  let component: NeworkFailureComponent;
  let fixture: ComponentFixture<NeworkFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeworkFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeworkFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
