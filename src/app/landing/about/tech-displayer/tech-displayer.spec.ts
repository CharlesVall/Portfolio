import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechDisplayer } from './tech-displayer';

describe('TechDisplayer', () => {
  let component: TechDisplayer;
  let fixture: ComponentFixture<TechDisplayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechDisplayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechDisplayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
