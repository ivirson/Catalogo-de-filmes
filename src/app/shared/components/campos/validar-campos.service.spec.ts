import { TestBed } from '@angular/core/testing';

import { ValidarCamposService } from './validar-campos.service';

describe('ValidarCamposService', () => {
  let service: ValidarCamposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarCamposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
