import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationServiceComponent } from './confirmation-service.component';

describe('ConfirmationServiceComponent', () => {
  let component: ConfirmationServiceComponent;
  let fixture: ComponentFixture<ConfirmationServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
