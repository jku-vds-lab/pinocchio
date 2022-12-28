import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeChartComponent } from './some-chart.component';

describe('SomeChartComponent', () => {
  let component: SomeChartComponent;
  let fixture: ComponentFixture<SomeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomeChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SomeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
