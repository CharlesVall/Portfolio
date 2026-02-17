import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenFooter } from './fullscreen-footer';

describe('FullscreenFooter', () => {
  let component: FullscreenFooter;
  let fixture: ComponentFixture<FullscreenFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullscreenFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullscreenFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
