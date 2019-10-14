import {TestBed} from '@angular/core/testing';
import {ItemCardService} from './itemCard.service';
import {ItemCard} from './itemCard.model';
import {HttpErrorResponse} from '@angular/common/http';
import {configureTestSuite} from 'ng-bullet';
import {FirebaseModule} from '../../../shared/modules/firebase.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {CookieService} from 'ngx-cookie';
import {AngularFirestore} from '@angular/fire/firestore';
import {of, throwError} from 'rxjs';

describe('ItemCardService', () => {
  const itemCardId = 'BzTvl77YsRTtdihH0jeh';
  let itemCardService: ItemCardService;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss', 'showSnackBar']);
  const afsSpy = jasmine.createSpyObj('AngularFirestore', ['doc', 'collection', 'delete']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        FirebaseModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: afsSpy},
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {
          provide: CookieService, useValue: {
            get: () => 0
          }
        },
        {
          provide: I18n, useValue: () => {
          }
        },
        ItemCardService
      ]
    });
  });

  beforeEach(() => {
    afsSpy.doc.and.returnValue({
      update: () => new Promise((resolve) => resolve()),
      get: () => of({
        data: () => new ItemCard({
          id: itemCardId,
          name: 'test',
          alterEgo: 'test'
        })
      }),
      delete: () => new Promise((resolve) => resolve())
    });

    afsSpy.collection.and.returnValue({
      add: () => new Promise((resolve) => resolve()),
      snapshotChanges: () => of([
        {
          payload: {
            doc: {
              id: 'asd',
              data: () => {
                return {
                  id: 'noid',
                  name: 'test'
                };
              }
            }
          }
        }
      ])
    });

    itemCardService = TestBed.get(ItemCardService);
  });

  it('should get itemCard by id ' + itemCardId, (() => {
    itemCardService.getItemCard(itemCardId).subscribe((itemCard: ItemCard) => {
      expect(itemCard.id).toEqual(itemCardId);
    });
  }));

  it('should get itemCards', (() => {
    itemCardService.getitemCards().subscribe((itemCards: ItemCard[]) => {
      expect(itemCards.length).toBe(1);
    });
  }));

  it('should fail getting itemCard by no id', (() => {
    itemCardService.getItemCard('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should create a itemCard', (() => {
    itemCardService.createItemCard(new ItemCard({
      name: 'test',
      alterEgo: 'test'
    })).then(() => {
      expect(afsSpy.collection).toHaveBeenCalled();
    });
  }));

  it('should update itemCard', (() => {
    itemCardService.updateItemCard(new ItemCard({
      name: 'test',
      alterEgo: 'test'
    })).then(() => {
      expect(afsSpy.doc).toHaveBeenCalled();
    });
  }));

  it('should delete itemCard', (() => {
    itemCardService.deleteItemCard('oneId').then(() => {
      expect(afsSpy.doc).toHaveBeenCalled();
    });
  }));

  it('should check if user can vote', (() => {
    expect(itemCardService.checkIfUserCanVote()).toBe(true);
  }));

  it('should fail getting one itemCard', (() => {
    afsSpy.doc.and.returnValue({
      get: () => throwError({message: 'this is an error', status: 404})
    });

    itemCardService.getItemCard('asd').subscribe(() => {
    }, (error) => {
      expect(error.status).toBe(404);
    });

    afsSpy.doc.and.returnValue({
      get: () => throwError({message: 'this is an error', status: 500})
    });

    itemCardService.getItemCard('internal error').subscribe(() => {
    }, (error) => {
      expect(error.status).toBe(500);
    });
  }));
});
