import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingStatusDetailsComponent } from './pending-status-details.component';

describe('PendingStatusDetailsComponent', () => {
  let component: PendingStatusDetailsComponent;
  let fixture: ComponentFixture<PendingStatusDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingStatusDetailsComponent]
    });
    fixture = TestBed.createComponent(PendingStatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
