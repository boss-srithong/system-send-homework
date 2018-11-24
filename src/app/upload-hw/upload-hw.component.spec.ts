import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadHWComponent } from './upload-hw.component';

describe('UploadHWComponent', () => {
  let component: UploadHWComponent;
  let fixture: ComponentFixture<UploadHWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadHWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadHWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
