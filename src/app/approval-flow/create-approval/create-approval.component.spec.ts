import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApprovalComponent } from './create-approval.component';

describe('CreateApprovalComponent', () => {
  let component: CreateApprovalComponent;
  let fixture: ComponentFixture<CreateApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateApprovalComponent]
    });
    fixture = TestBed.createComponent(CreateApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
