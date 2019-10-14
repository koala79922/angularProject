import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {ItemCardDetailPageComponent} from './itemCard-detail-page.component';
import {configureTestSuite} from 'ng-bullet';
import {ItemCardLoadingComponent} from '../../../../shared/components/itemCard-loading/itemCard-loading.component';
import {ItemCardCardComponent} from '../../../../shared/components/itemCard-card/itemCard-card.component';
import {MockComponent} from 'ng-mocks';
import {ItemCardService} from '../../shared/itemCard.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ItemCard} from '../../shared/itemCard.model';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Location} from '@angular/common';

describe('ItemCardDetailPage', () => {
  let component: ItemCardDetailPageComponent;
  let fixture: ComponentFixture<ItemCardDetailPageComponent>;

  const itemCardServiceSpy = jasmine.createSpyObj('ItemCardService', ['getItemCard']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        MockComponent(ItemCardLoadingComponent),
        MockComponent(ItemCardCardComponent),
        ItemCardDetailPageComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                itemCard: new ItemCard({id: '1'})
              }
            }
          }
        },
        {provide: ItemCardService, useValue: itemCardServiceSpy},
        {
          provide: Location, useValue: {
            back: () => {
            }
          }
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardDetailPageComponent);
    component = fixture.debugElement.componentInstance;
    itemCardServiceSpy.getItemCard.and.returnValue(of(new ItemCard({id: '1', name: 'test', default: true})));
    fixture.detectChanges();
  });

  it('should create itemCard detail component', (() => {
    expect(component).toBeTruthy();
    expect(component.itemCard.id).toBe('1');
  }));
});
