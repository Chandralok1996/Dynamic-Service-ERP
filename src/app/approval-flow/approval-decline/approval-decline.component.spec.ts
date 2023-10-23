import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalDeclineComponent } from './approval-decline.component';

describe('ApprovalDeclineComponent', () => {
  let component: ApprovalDeclineComponent;
  let fixture: ComponentFixture<ApprovalDeclineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalDeclineComponent]
    });
    fixture = TestBed.createComponent(ApprovalDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
