import { NgTimePage } from './app.po';

describe('ng-time App', function() {
  let page: NgTimePage;

  beforeEach(() => {
    page = new NgTimePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ng-time works!');
  });
});
