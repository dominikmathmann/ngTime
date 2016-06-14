import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { RecordingService } from './recording.service';

describe('Recording Service', () => {
  beforeEachProviders(() => [RecordingService]);

  it('should ...',
      inject([RecordingService], (service: RecordingService) => {
    expect(service).toBeTruthy();
  }));
});
