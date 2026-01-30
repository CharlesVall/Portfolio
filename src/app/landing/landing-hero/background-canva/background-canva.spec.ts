import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundCanva } from './background-canva';

describe('BackgroundCanva', () => {
  let component: BackgroundCanva;
  let fixture: ComponentFixture<BackgroundCanva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundCanva]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundCanva);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
