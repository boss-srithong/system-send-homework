import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHWComponent } from './view-hw.component';

describe('ViewHWComponent', () => {
  let component: ViewHWComponent;
  let fixture: ComponentFixture<ViewHWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
