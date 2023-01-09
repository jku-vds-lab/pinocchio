import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectedTestingComponent } from './corrected-testing.component';

describe('CorrectedTestingComponent', () => {
  let component: CorrectedTestingComponent;
  let fixture: ComponentFixture<CorrectedTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectedTestingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrectedTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
