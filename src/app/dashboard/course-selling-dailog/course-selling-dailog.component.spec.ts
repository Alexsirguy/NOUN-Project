import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSellingDailogComponent } from './course-selling-dailog.component';

describe('CourseSellingDailogComponent', () => {
  let component: CourseSellingDailogComponent;
  let fixture: ComponentFixture<CourseSellingDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSellingDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSellingDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
