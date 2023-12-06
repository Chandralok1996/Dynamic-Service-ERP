import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRTicketListComponent } from './qrticket-list.component';

describe('QRTicketListComponent', () => {
  let component: QRTicketListComponent;
  let fixture: ComponentFixture<QRTicketListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRTicketListComponent]
    });
    fixture = TestBed.createComponent(QRTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
