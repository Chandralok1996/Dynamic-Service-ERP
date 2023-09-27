import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalalertComponent } from './modalalert.component';

describe('ModalalertComponent', () => {
  let component: ModalalertComponent;
  let fixture: ComponentFixture<ModalalertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalalertComponent]
    });
    fixture = TestBed.createComponent(ModalalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
