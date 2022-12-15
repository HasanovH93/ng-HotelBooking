import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedHotelsComponent } from './liked-hotels.component';

describe('LikedHotelsComponent', () => {
  let component: LikedHotelsComponent;
  let fixture: ComponentFixture<LikedHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedHotelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
