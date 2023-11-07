import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailActionComponent } from './mail-action.component';

describe('MailActionComponent', () => {
  let component: MailActionComponent;
  let fixture: ComponentFixture<MailActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailActionComponent]
    });
    fixture = TestBed.createComponent(MailActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
