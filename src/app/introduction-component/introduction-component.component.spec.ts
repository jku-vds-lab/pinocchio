import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionComponentComponent } from './introduction-component.component';

describe('IntroductionComponentComponent', () => {
  let component: IntroductionComponentComponent;
  let fixture: ComponentFixture<IntroductionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroductionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroductionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
