import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTicketDetailsComponent } from './all-ticket-details.component';

describe('AllTicketDetailsComponent', () => {
  let component: AllTicketDetailsComponent;
  let fixture: ComponentFixture<AllTicketDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTicketDetailsComponent]
    });
    fixture = TestBed.createComponent(AllTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
