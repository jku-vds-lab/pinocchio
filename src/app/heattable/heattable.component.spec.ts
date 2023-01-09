import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeattableComponent } from './heattable.component';

describe('HeattableComponent', () => {
  let component: HeattableComponent;
  let fixture: ComponentFixture<HeattableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeattableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeattableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
