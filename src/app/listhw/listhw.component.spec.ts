import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListhwComponent } from './listhw.component';

describe('ListhwComponent', () => {
  let component: ListhwComponent;
  let fixture: ComponentFixture<ListhwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListhwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListhwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
