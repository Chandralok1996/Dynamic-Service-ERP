import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLocationDetailsComponent } from './asset-location-details.component';

describe('AssetLocationDetailsComponent', () => {
  let component: AssetLocationDetailsComponent;
  let fixture: ComponentFixture<AssetLocationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetLocationDetailsComponent]
    });
    fixture = TestBed.createComponent(AssetLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
