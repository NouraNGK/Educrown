import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningWordComponent } from './opening-word.component';

describe('OpeningWordComponent', () => {
  let component: OpeningWordComponent;
  let fixture: ComponentFixture<OpeningWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
