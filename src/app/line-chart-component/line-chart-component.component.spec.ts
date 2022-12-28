import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartComponentComponent } from './line-chart-component.component';

describe('LineChartComponentComponent', () => {
  let component: LineChartComponentComponent;
  let fixture: ComponentFixture<LineChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
