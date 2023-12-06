import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousekeepingRequestDetailsComponent } from './housekeeping-request-details.component';

describe('HousekeepingRequestDetailsComponent', () => {
  let component: HousekeepingRequestDetailsComponent;
  let fixture: ComponentFixture<HousekeepingRequestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HousekeepingRequestDetailsComponent]
    });
    fixture = TestBed.createComponent(HousekeepingRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
