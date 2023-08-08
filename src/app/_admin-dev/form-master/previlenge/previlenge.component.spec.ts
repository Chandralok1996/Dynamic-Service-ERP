import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevilengeComponent } from './previlenge.component';

describe('PrevilengeComponent', () => {
  let component: PrevilengeComponent;
  let fixture: ComponentFixture<PrevilengeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrevilengeComponent]
    });
    fixture = TestBed.createComponent(PrevilengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
