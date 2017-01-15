import { YopAngularPage } from './app.po';

describe('yop-angular App', function() {
  let page: YopAngularPage;

  beforeEach(() => {
    page = new YopAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
