import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTicketUpdateComponent } from './all-ticket-update.component';

describe('AllTicketUpdateComponent', () => {
  let component: AllTicketUpdateComponent;
  let fixture: ComponentFixture<AllTicketUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTicketUpdateComponent]
    });
    fixture = TestBed.createComponent(AllTicketUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
