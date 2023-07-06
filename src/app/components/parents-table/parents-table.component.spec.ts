import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsTableComponent } from './parents-table.component';

describe('ParentsTableComponent', () => {
  let component: ParentsTableComponent;
  let fixture: ComponentFixture<ParentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
