import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterStudentIdComponent } from './enter-student-id.component';

describe('EnterStudentIdComponent', () => {
  let component: EnterStudentIdComponent;
  let fixture: ComponentFixture<EnterStudentIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterStudentIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterStudentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
