import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorRegComponent } from './tutor-reg.component';

describe('TutorRegComponent', () => {
  let component: TutorRegComponent;
  let fixture: ComponentFixture<TutorRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
