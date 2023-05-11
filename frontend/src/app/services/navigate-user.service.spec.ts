import { TestBed } from '@angular/core/testing';

import { NavigateUserService } from './navigate-user.service';

describe('NavigateUserService', () => {
  let service: NavigateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
