import {TestBed} from '@angular/core/testing';
import {ItemCardService} from './itemCard.service';
import {configureTestSuite} from 'ng-bullet';
import {ItemCardResolver} from './itemCard.resolver';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {ItemCard} from './itemCard.model';
import {of} from 'rxjs';

describe('ItemCardResolver', () => {
  let itemCardResolver: ItemCardResolver;
  let route: ActivatedRoute;

  const itemCardServiceSpy = jasmine.createSpyObj('ItemCardService', ['getItemCard']);
  const itemCardId = '123';

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ItemCardService, useValue: itemCardServiceSpy},
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({id: itemCardId})}}
        },
        ItemCardResolver
      ]
    });
  });

  beforeEach(() => {
    itemCardResolver = TestBed.get(ItemCardResolver);
    route = TestBed.get(ActivatedRoute);
  });

  it('should resolve a itemCard by id', (() => {
    itemCardServiceSpy.getItemCard.and.returnValue(of(new ItemCard({id: itemCardId})));
    itemCardResolver.resolve(route.snapshot).subscribe((itemCard) => {
      expect(itemCard.id).toBe(itemCardId);
    });
  }));
});
