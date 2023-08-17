import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigItemComponent } from './config-item.component';

describe('ConfigItemComponent', () => {
  let component: ConfigItemComponent;
  let fixture: ComponentFixture<ConfigItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigItemComponent]
    });
    fixture = TestBed.createComponent(ConfigItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
