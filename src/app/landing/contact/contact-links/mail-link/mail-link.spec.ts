import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailLink } from './mail-link';

describe('MailLink', () => {
  let component: MailLink;
  let fixture: ComponentFixture<MailLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailLink);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
