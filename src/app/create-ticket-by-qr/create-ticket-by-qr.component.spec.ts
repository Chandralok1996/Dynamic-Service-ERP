import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketByQRComponent } from './create-ticket-by-qr.component';

describe('CreateTicketByQRComponent', () => {
  let component: CreateTicketByQRComponent;
  let fixture: ComponentFixture<CreateTicketByQRComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTicketByQRComponent]
    });
    fixture = TestBed.createComponent(CreateTicketByQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
