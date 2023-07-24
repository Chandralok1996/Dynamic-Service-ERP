import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngViewComponent } from './eng-view.component';

describe('EngViewComponent', () => {
  let component: EngViewComponent;
  let fixture: ComponentFixture<EngViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngViewComponent]
    });
    fixture = TestBed.createComponent(EngViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
