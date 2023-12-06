import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRequestDetailsComponent } from './hr-request-details.component';

describe('HrRequestDetailsComponent', () => {
  let component: HrRequestDetailsComponent;
  let fixture: ComponentFixture<HrRequestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrRequestDetailsComponent]
    });
    fixture = TestBed.createComponent(HrRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
