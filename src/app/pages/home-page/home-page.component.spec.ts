import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ItemCardService} from '../../modules/itemCards/shared/itemCard.service';
import {HomePageComponent} from './home-page.component';
import {of} from 'rxjs';
import {ItemCard} from '../../modules/itemCards/shared/itemCard.model';
import {configureTestSuite} from 'ng-bullet';
import {ItemCardLoadingComponent} from '../../shared/components/itemCard-loading/itemCard-loading.component';
import {ItemCardCardComponent} from '../../shared/components/itemCard-card/itemCard-card.component';
import {LoadingPlaceholderComponent} from '../../shared/components/loading-placeholder/loading-placeholder.component';
import {MockComponent} from 'ng-mocks';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const itemCardServiceSpy = jasmine.createSpyObj('ItemCardService', ['getitemCards']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        MockComponent(ItemCardCardComponent),
        MockComponent(ItemCardLoadingComponent),
        MockComponent(LoadingPlaceholderComponent),
        HomePageComponent
      ],
      providers: [
        {provide: ItemCardService, useValue: itemCardServiceSpy}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.debugElement.componentInstance;
    itemCardServiceSpy.getitemCards.and.returnValue(of([new ItemCard({name: 'itemCard test'})]));
    fixture.detectChanges();
  });

  it('should create component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should initialice itemCards', async(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('app-itemCard-card')).length).toBe(1);
    });
  }));
});
