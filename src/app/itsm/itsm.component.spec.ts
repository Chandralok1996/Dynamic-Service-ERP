import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsmComponent } from './itsm.component';

describe('ItsmComponent', () => {
  let component: ItsmComponent;
  let fixture: ComponentFixture<ItsmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItsmComponent]
    });
    fixture = TestBed.createComponent(ItsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
