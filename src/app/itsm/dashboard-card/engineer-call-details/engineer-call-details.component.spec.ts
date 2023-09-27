import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerCallDetailsComponent } from './engineer-call-details.component';

describe('EngineerCallDetailsComponent', () => {
  let component: EngineerCallDetailsComponent;
  let fixture: ComponentFixture<EngineerCallDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngineerCallDetailsComponent]
    });
    fixture = TestBed.createComponent(EngineerCallDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
