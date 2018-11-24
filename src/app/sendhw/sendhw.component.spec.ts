import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendhwComponent } from './sendhw.component';

describe('SendhwComponent', () => {
  let component: SendhwComponent;
  let fixture: ComponentFixture<SendhwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendhwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendhwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
