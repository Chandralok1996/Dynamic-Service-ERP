import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItRequestDetailsComponent } from './it-request-details.component';

describe('ItRequestDetailsComponent', () => {
  let component: ItRequestDetailsComponent;
  let fixture: ComponentFixture<ItRequestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItRequestDetailsComponent]
    });
    fixture = TestBed.createComponent(ItRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
