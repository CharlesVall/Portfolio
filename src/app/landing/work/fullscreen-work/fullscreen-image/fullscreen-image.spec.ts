import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenImage } from './fullscreen-image';

describe('FullscreenImage', () => {
  let component: FullscreenImage;
  let fixture: ComponentFixture<FullscreenImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullscreenImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullscreenImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
