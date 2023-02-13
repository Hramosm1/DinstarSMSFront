import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProcessComponent } from './details-process.component';

describe('DetailsProcessComponent', () => {
  let component: DetailsProcessComponent;
  let fixture: ComponentFixture<DetailsProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
