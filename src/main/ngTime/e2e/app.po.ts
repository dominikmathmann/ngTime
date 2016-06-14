export class NgTimePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng-time-app h1')).getText();
  }
}
