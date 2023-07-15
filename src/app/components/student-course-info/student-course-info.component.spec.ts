import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseInfoComponent } from './student-course-info.component';

describe('StudentCourseInfoComponent', () => {
  let component: StudentCourseInfoComponent;
  let fixture: ComponentFixture<StudentCourseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCourseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
