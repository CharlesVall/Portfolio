import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenAside } from './fullscreen-aside';

describe('FullscreenAside', () => {
  let component: FullscreenAside;
  let fixture: ComponentFixture<FullscreenAside>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullscreenAside]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullscreenAside);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
