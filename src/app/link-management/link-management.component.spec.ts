import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkManagementComponent } from './link-management.component';

describe('LinkManagementComponent', () => {
  let component: LinkManagementComponent;
  let fixture: ComponentFixture<LinkManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkManagementComponent]
    });
    fixture = TestBed.createComponent(LinkManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
