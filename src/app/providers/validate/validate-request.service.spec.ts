import { TestBed, inject } from '@angular/core/testing';

import { ValidateRequestService } from './validate-request.service';

describe('ValidateRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidateRequestService]
    });
  });

  it('should be created', inject([ValidateRequestService], (service: ValidateRequestService) => {
    expect(service).toBeTruthy();
  }));
});
