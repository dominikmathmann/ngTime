import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { CustomerService } from './customer.service';

describe('Customer Service', () => {
  beforeEachProviders(() => [CustomerService]);

  it('should ...',
      inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }));
});
