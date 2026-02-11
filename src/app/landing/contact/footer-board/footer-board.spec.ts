import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBoard } from './footer-board';

describe('FooterBoard', () => {
  let component: FooterBoard;
  let fixture: ComponentFixture<FooterBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
