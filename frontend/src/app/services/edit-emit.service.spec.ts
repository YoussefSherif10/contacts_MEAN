import { TestBed } from '@angular/core/testing';

import { EditEmitService } from './edit-emit.service';

describe('EditEmitService', () => {
  let service: EditEmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditEmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
