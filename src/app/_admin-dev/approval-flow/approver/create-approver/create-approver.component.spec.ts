import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApproverComponent } from './create-approver.component';

describe('CreateApproverComponent', () => {
  let component: CreateApproverComponent;
  let fixture: ComponentFixture<CreateApproverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateApproverComponent]
    });
    fixture = TestBed.createComponent(CreateApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
