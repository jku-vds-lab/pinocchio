import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomePlotComponent } from './some-plot.component';

describe('SomePlotComponent', () => {
  let component: SomePlotComponent;
  let fixture: ComponentFixture<SomePlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomePlotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SomePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
