import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {ItemCard} from './itemCard.model';
import {catchError, map, tap} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {LoggerService} from '../../../shared/services/logger.service';
import {AppConfig} from '../../../configs/app.config';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {EndpointsConfig} from '../../../configs/endpoints.config';
import {CookieService} from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class ItemCardService {
  private itemCardsCollection: AngularFirestoreCollection<ItemCard>;

  constructor(private afs: AngularFirestore,
              private snackBar: MatSnackBar,
              private i18n: I18n,
              private cookieService: CookieService) {
    this.itemCardsCollection = this.afs.collection<ItemCard>(EndpointsConfig.itemCards.list, (itemCard) => {
      return itemCard.orderBy('likes', 'desc');
    });
  }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result);
    };
  }

  checkIfUserCanVote(): boolean {
    const votes = this.cookieService.get('votes');
    return Number(votes ? votes : 0) < AppConfig.votesLimit;
  }

  getitemCards(): Observable<ItemCard[]> {
    return this.itemCardsCollection.snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return new ItemCard({id: action.payload.doc.id, ...data});
          });
        }),
        tap(() => LoggerService.log(`fetched itemCards`)),
        catchError(ItemCardService.handleError('getitemCards', []))
      );
  }

  getItemCard(id: string): Observable<any> {
    return this.afs.doc(EndpointsConfig.itemCards.detail(id)).get().pipe(
      map((itemCard) => {
        return new ItemCard({id, ...itemCard.data()});
      }),
      tap(() => LoggerService.log(`fetched itemCard ${id}`)),
      catchError(ItemCardService.handleError('getItemCard', []))
    );
  }

  createItemCard(itemCard: ItemCard): Promise<DocumentReference> {
    return this.itemCardsCollection.add(JSON.parse(JSON.stringify(itemCard)));
  }

  updateItemCard(itemCard: ItemCard): Promise<void> {
    return this.afs.doc(EndpointsConfig.itemCards.detail(itemCard.id)).update(JSON.parse(JSON.stringify(itemCard))).then(() => {
      LoggerService.log(`updated itemCard w/ id=${itemCard.id}`);
      this.showSnackBar(this.i18n({value: 'Saved', id: '@@saved'}));
    });
  }

  deleteItemCard(id: string): Promise<void> {
    return this.afs.doc(EndpointsConfig.itemCards.detail(id)).delete();
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }
}
