import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTicketListComponent } from './all-ticket-list.component';

describe('AllTicketListComponent', () => {
  let component: AllTicketListComponent;
  let fixture: ComponentFixture<AllTicketListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTicketListComponent]
    });
    fixture = TestBed.createComponent(AllTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
