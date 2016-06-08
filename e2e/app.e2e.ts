import { RolGamePage } from './app.po';

describe('rol-game App', function() {
  let page: RolGamePage;

  beforeEach(() => {
    page = new RolGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rol-game works!');
  });
});
