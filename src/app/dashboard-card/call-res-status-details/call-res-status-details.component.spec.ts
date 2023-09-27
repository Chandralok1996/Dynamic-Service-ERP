import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallResStatusDetailsComponent } from './call-res-status-details.component';

describe('CallResStatusDetailsComponent', () => {
  let component: CallResStatusDetailsComponent;
  let fixture: ComponentFixture<CallResStatusDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallResStatusDetailsComponent]
    });
    fixture = TestBed.createComponent(CallResStatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
