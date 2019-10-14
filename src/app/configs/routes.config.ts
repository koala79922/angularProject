import {InjectionToken} from '@angular/core';

export let ROUTES_CONFIG = new InjectionToken('routes.config');

const basePaths = {
  page2: 'page2',
  page3: 'page3',
  page4: 'page4',
};

const routesNames = {
  home: '',
  error404: '404',
  itemCards: {
    basePath: basePaths.page2
  },

};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `/${routesNames.home}`,
    error404: `/${routesNames.error404}`,
    itemCards: {
      detail: getItemCardDetail
    }
  }
};

export function getItemCardDetail(id) {
  return `/${basePaths.page2}/${id}`;
}
