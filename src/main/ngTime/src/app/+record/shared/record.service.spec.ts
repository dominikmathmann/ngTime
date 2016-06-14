import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { RecordService } from './record.service';

describe('Record Service', () => {
  beforeEachProviders(() => [RecordService]);

  it('should ...',
      inject([RecordService], (service: RecordService) => {
    expect(service).toBeTruthy();
  }));
});
