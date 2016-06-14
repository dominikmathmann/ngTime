import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { NgTimeAppComponent } from '../app/ng-time.component';

beforeEachProviders(() => [NgTimeAppComponent]);

describe('App: NgTime', () => {
  it('should create the app',
      inject([NgTimeAppComponent], (app: NgTimeAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng-time works!\'',
      inject([NgTimeAppComponent], (app: NgTimeAppComponent) => {
    expect(app.title).toEqual('ng-time works!');
  }));
});
