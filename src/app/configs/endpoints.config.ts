import {InjectionToken} from '@angular/core';

export let ENDPOINTS_CONFIG = new InjectionToken('endpoints.config');

export const EndpointsConfig: any = {
  itemCards: {
    list: 'itemCards',
    detail: getItemCardDetail
  }
};

export function getItemCardDetail(id) {
  return `/itemCards/${id}`;
}
