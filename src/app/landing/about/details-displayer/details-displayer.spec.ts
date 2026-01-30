import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDisplayer } from './details-displayer';

describe('DetailsDisplayer', () => {
  let component: DetailsDisplayer;
  let fixture: ComponentFixture<DetailsDisplayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDisplayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDisplayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
