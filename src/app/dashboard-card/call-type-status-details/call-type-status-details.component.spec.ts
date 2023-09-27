import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTypeStatusDetailsComponent } from './call-type-status-details.component';

describe('CallTypeStatusDetailsComponent', () => {
  let component: CallTypeStatusDetailsComponent;
  let fixture: ComponentFixture<CallTypeStatusDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallTypeStatusDetailsComponent]
    });
    fixture = TestBed.createComponent(CallTypeStatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
