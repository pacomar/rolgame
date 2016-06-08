export class RolGamePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rol-game-app h1')).getText();
  }
}
