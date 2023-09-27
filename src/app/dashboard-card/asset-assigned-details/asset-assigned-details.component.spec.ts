import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAssignedDetailsComponent } from './asset-assigned-details.component';

describe('AssetAssignedDetailsComponent', () => {
  let component: AssetAssignedDetailsComponent;
  let fixture: ComponentFixture<AssetAssignedDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetAssignedDetailsComponent]
    });
    fixture = TestBed.createComponent(AssetAssignedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
