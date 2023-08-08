import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopManagementComponent } from './desktop-management.component';

describe('DesktopManagementComponent', () => {
  let component: DesktopManagementComponent;
  let fixture: ComponentFixture<DesktopManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopManagementComponent]
    });
    fixture = TestBed.createComponent(DesktopManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
