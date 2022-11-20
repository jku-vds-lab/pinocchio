import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalTestsComponent } from './statistical-tests.component';

describe('StatisticalTestsComponent', () => {
  let component: StatisticalTestsComponent;
  let fixture: ComponentFixture<StatisticalTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticalTestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticalTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
