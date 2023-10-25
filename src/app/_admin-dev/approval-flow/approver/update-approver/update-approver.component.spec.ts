import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApproverComponent } from './update-approver.component';

describe('UpdateApproverComponent', () => {
  let component: UpdateApproverComponent;
  let fixture: ComponentFixture<UpdateApproverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateApproverComponent]
    });
    fixture = TestBed.createComponent(UpdateApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
