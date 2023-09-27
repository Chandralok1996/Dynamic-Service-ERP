import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeDetailsComponent } from './asset-type-details.component';

describe('AssetTypeDetailsComponent', () => {
  let component: AssetTypeDetailsComponent;
  let fixture: ComponentFixture<AssetTypeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetTypeDetailsComponent]
    });
    fixture = TestBed.createComponent(AssetTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
