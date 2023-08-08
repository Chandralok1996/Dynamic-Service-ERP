import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManagementComponent } from './server-management.component';

describe('ServerManagementComponent', () => {
  let component: ServerManagementComponent;
  let fixture: ComponentFixture<ServerManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerManagementComponent]
    });
    fixture = TestBed.createComponent(ServerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
