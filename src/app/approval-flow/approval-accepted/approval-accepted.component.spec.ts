import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalAcceptedComponent } from './approval-accepted.component';

describe('ApprovalAcceptedComponent', () => {
  let component: ApprovalAcceptedComponent;
  let fixture: ComponentFixture<ApprovalAcceptedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalAcceptedComponent]
    });
    fixture = TestBed.createComponent(ApprovalAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
