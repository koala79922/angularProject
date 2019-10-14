import {browser, by, element} from 'protractor';
import {RoutesConfig} from 'src/app/configs/routes.config';

export class itemCardsListPage {
  static navigateTo(): any {
    return browser.get(RoutesConfig.routesNames.itemCards.basePath);
  }

  static getNumberitemCards(): any {
    return element.all(by.css('#left mat-list-item')).count();
  }
}
