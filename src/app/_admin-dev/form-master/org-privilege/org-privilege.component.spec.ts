import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPrivilegeComponent } from './org-privilege.component';

describe('OrgPrivilegeComponent', () => {
  let component: OrgPrivilegeComponent;
  let fixture: ComponentFixture<OrgPrivilegeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgPrivilegeComponent]
    });
    fixture = TestBed.createComponent(OrgPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
