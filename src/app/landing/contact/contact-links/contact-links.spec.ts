import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLinks } from './contact-links';

describe('ContactLinks', () => {
  let component: ContactLinks;
  let fixture: ComponentFixture<ContactLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactLinks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
