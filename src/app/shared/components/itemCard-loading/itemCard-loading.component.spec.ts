import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ItemCardLoadingComponent} from './itemCard-loading.component';
import {configureTestSuite} from 'ng-bullet';
import {LoadingPlaceholderComponent} from '../loading-placeholder/loading-placeholder.component';
import {MockComponent} from 'ng-mocks';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

describe('ItemCardLoadingComponent', () => {
  let component: ItemCardLoadingComponent;
  let fixture: ComponentFixture<ItemCardLoadingComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule
      ],
      declarations: [
        MockComponent(LoadingPlaceholderComponent),
        ItemCardLoadingComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
