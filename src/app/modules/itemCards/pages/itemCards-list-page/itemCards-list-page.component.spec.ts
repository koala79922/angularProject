import {ComponentFixture, TestBed} from '@angular/core/testing';
import {itemCardsListPageComponent} from './itemCards-list-page.component';
import {configureTestSuite} from 'ng-bullet';
import {LoadingPlaceholderComponent} from '../../../../shared/components/loading-placeholder/loading-placeholder.component';
import {ItemCardService} from '../../shared/itemCard.service';
import {ItemCard} from '../../shared/itemCard.model';
import {of} from 'rxjs';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ItemCardRemoveComponent} from '../../components/itemCard-remove/itemCard-remove.component';
import {Router} from '@angular/router';
import {MockComponent, MockModule} from 'ng-mocks';
import {MatDialog} from '@angular/material/dialog';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatListModule} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxScrollToFirstInvalidModule} from '@ismaestro/ngx-scroll-to-first-invalid';
import {RouterTestingModule} from '@angular/router/testing';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {ROUTES_CONFIG, RoutesConfig} from '../../../../configs/routes.config';
import {CookieService} from 'ngx-cookie';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('itemCardsListPageComponent', () => {
  let component: itemCardsListPageComponent;
  let fixture: ComponentFixture<itemCardsListPageComponent>;
  let router: Router;
  let navigateSpy;

  const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss']);
  const itemCardServiceSpy = jasmine.createSpyObj('ItemCardService',
    ['checkIfUserCanVote', 'createItemCard', 'getitemCards', 'updateItemCard', 'deleteItemCard', 'showSnackBar']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MockModule(NgxScrollToFirstInvalidModule)
      ],
      declarations: [
        MockComponent(ItemCardRemoveComponent),
        MockComponent(LoadingPlaceholderComponent),
        itemCardsListPageComponent
      ],
      providers: [
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: MatDialog, useValue: matDialogSpy},
        {provide: ItemCardService, useValue: itemCardServiceSpy},
        {
          provide: I18n, useValue: () => {
          }
        },
        {provide: ROUTES_CONFIG, useValue: RoutesConfig},
        {
          provide: CookieService, useValue: {
            get: (key) => key,
            put: () => true,
          }
        }
      ]
    });
  });

  beforeEach(() => {
    itemCardServiceSpy.checkIfUserCanVote.and.returnValue(true);
    fixture = TestBed.createComponent(itemCardsListPageComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    navigateSpy = spyOn(router, 'navigate');
    itemCardServiceSpy.getitemCards.and.returnValue(of([new ItemCard({is: 1, name: 'itemCard test'})]));
    fixture.detectChanges();
  });

  it('should create component and load itemCards', (() => {
    expect(component).toBeTruthy();
    expect(component.itemCards.length).toBe(1);
    expect(component.itemCards[0].name).toBe('itemCard test');
  }));

  it('should create new itemCard success', (() => {
    const success = new Promise((resolve) => {
      resolve('asd');
    });
    itemCardServiceSpy.createItemCard.and.returnValue(success);
    component.newItemCardForm = new FormGroup({
      name: new FormControl('new itemCard!', [Validators.required, Validators.maxLength(30)]),
      alterEgo: new FormControl('haha', [Validators.required, Validators.maxLength(30)])
    });

    component.error = null;
    component.createNewItemCard();
    expect(component.error).toBe(null);
  }));

  it('should create new itemCard error', (async () => {
    const error = new Promise((resolve, reject) => {
      reject();
    });
    itemCardServiceSpy.createItemCard.and.returnValue(error);
    component.newItemCardForm = new FormGroup({
      name: new FormControl('new itemCard!', [Validators.required, Validators.maxLength(30)]),
      alterEgo: new FormControl('haha', [Validators.required, Validators.maxLength(30)])
    });

    component.error = false;
    await component.createNewItemCard();
    expect(component.error).toBe(true);
  }));

  it('should like a itemCard', (() => {
    const itemCard = new ItemCard({likes: 0});
    component.like(itemCard);
    expect(itemCard.likes).toBe(1);
  }));

  it('should delete a itemCard', (() => {
    const itemCard = new ItemCard({id: 'testId'});
    matDialogSpy.open.and.returnValue({
      afterClosed: () => {
        return of(true);
      }
    });
    itemCardServiceSpy.deleteItemCard.and.returnValue(new Promise(() => true));
    component.deleteItemCard(itemCard);
    expect(itemCardServiceSpy.deleteItemCard).toHaveBeenCalledWith('testId');
  }));
});
