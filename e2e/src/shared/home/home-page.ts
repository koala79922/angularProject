import {browser, by, element} from 'protractor';

export class HomePage {
  static navigateTo(): any {
    return browser.get('/');
  }

  static getNumberitemCards(): any {
    return element.all(by.css('#itemCards-list mat-card')).count();
  }
}
