import { TestBed } from '@angular/core/testing';

import { ConfigParamsService } from './config-params.service';

describe('ConfigParamsService', () => {
  let service: ConfigParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
