import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryManagementComponent } from './history-management.component';

describe('HistoryManagementComponent', () => {
  let component: HistoryManagementComponent;
  let fixture: ComponentFixture<HistoryManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryManagementComponent]
    });
    fixture = TestBed.createComponent(HistoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
