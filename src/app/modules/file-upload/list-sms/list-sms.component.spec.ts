import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSMSComponent } from './list-sms.component';

describe('ListSMSComponent', () => {
  let component: ListSMSComponent;
  let fixture: ComponentFixture<ListSMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSMSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
