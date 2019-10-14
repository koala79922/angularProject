import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ItemCardCardComponent} from './itemCard-card.component';
import {ItemCard} from '../../../modules/itemCards/shared/itemCard.model';
import {configureTestSuite} from 'ng-bullet';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {of} from 'rxjs';
import {ItemCardService} from '../../../modules/itemCards/shared/itemCard.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ROUTES_CONFIG, RoutesConfig} from '../../../configs/routes.config';
import {CookieService} from 'ngx-cookie';
import {PLATFORM_ID} from '@angular/core';
import {LazyLoadImageModule} from 'ng-lazyload-image';

describe('ItemCardCardComponent', () => {
  let component: ItemCardCardComponent;
  let fixture: ComponentFixture<ItemCardCardComponent>;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const itemCardServiceSpy = jasmine.createSpyObj('ItemCardService', ['checkIfUserCanVote', 'updateItemCard']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
        LazyLoadImageModule
      ],
      declarations: [
        ItemCardCardComponent
      ],
      providers: [
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: ItemCardService, useValue: itemCardServiceSpy},
        {
          provide: I18n, useValue: () => {
          }
        },
        {provide: CookieService, useValue: {}},
        {provide: ROUTES_CONFIG, useValue: RoutesConfig},
        {provide: PLATFORM_ID, useValue: 'browser'}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardCardComponent);
    component = fixture.componentInstance;
    itemCardServiceSpy.updateItemCard.and.returnValue(of([new ItemCard({name: 'itemCard test'})]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should like a itemCard', () => {
    const itemCard = new ItemCard({likes: 1});
    itemCard.like();
    expect(itemCard.likes).toBe(2);
  });
});
