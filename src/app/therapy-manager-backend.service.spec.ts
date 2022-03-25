import { TestBed } from '@angular/core/testing';

import { TherapyManagerBackendService } from './therapy-manager-backend.service';

describe('TherapyManagerBackendService', () => {
  let service: TherapyManagerBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapyManagerBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
