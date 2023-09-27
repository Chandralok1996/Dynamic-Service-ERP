import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallModeStatusDetailsComponent } from './call-mode-status-details.component';

describe('CallModeStatusDetailsComponent', () => {
  let component: CallModeStatusDetailsComponent;
  let fixture: ComponentFixture<CallModeStatusDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallModeStatusDetailsComponent]
    });
    fixture = TestBed.createComponent(CallModeStatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
