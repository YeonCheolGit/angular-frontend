import { TestBed } from '@angular/core/testing';

import { ApiValidationService } from './api-validation.service';

describe('ApiValidationService', () => {
  let service: ApiValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
