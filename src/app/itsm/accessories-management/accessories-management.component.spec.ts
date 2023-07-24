import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesManagementComponent } from './accessories-management.component';

describe('AccessoriesManagementComponent', () => {
  let component: AccessoriesManagementComponent;
  let fixture: ComponentFixture<AccessoriesManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessoriesManagementComponent]
    });
    fixture = TestBed.createComponent(AccessoriesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
