import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenWork } from './fullscreen-work';

describe('FullscreenWork', () => {
  let component: FullscreenWork;
  let fixture: ComponentFixture<FullscreenWork>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullscreenWork]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullscreenWork);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
