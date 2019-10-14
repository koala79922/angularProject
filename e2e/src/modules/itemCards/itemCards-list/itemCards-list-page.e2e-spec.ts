import {itemCardsListPage} from './itemCards-list-page';
import {browser} from 'protractor';

describe('itemCards list page', () => {
  let page;

  beforeEach(() => {
    page = new itemCardsListPage();
  });

  it('should contains equal or more itemCards than default ones', () => {
    itemCardsListPage.navigateTo();
    browser.driver.sleep(2000);
    expect<any>(itemCardsListPage.getNumberitemCards()).toBeGreaterThanOrEqual(8);
  });
});
