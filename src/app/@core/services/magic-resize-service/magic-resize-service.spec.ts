import { TestBed } from '@angular/core/testing';

import { MagicResizeService } from './magic-resize-service';

describe('MagicResizeService', () => {
  let service: MagicResizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagicResizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
