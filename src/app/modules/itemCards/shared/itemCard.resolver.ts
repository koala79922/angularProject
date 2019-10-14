import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ItemCard} from './itemCard.model';
import {Observable} from 'rxjs';
import {ItemCardService} from './itemCard.service';

@Injectable()
export class ItemCardResolver implements Resolve<Observable<ItemCard>> {
  constructor(private itemCardService: ItemCardService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.itemCardService.getItemCard(route.paramMap.get('id'));
  }
}
