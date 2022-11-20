import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualRegressionComponent } from './manual-regression.component';

describe('ManualRegressionComponent', () => {
  let component: ManualRegressionComponent;
  let fixture: ComponentFixture<ManualRegressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualRegressionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualRegressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
