import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjReportComponent } from './proj-report.component';

describe('ProjReportComponent', () => {
  let component: ProjReportComponent;
  let fixture: ComponentFixture<ProjReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjReportComponent]
    });
    fixture = TestBed.createComponent(ProjReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
