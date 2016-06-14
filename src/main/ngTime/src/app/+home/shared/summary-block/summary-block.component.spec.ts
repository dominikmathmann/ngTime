import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SummaryBlockComponent } from './summary-block.component';

describe('Component: SummaryBlock', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [SummaryBlockComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([SummaryBlockComponent],
      (component: SummaryBlockComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(SummaryBlockComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(SummaryBlockComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-summary-block></app-summary-block>
  `,
  directives: [SummaryBlockComponent]
})
class SummaryBlockComponentTestController {
}

