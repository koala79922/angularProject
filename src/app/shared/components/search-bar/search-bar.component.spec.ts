import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchBarComponent} from './search-bar.component';
import {ItemCardService} from '../../../modules/itemCards/shared/itemCard.service';
import {ItemCard} from '../../../modules/itemCards/shared/itemCard.model';
import {of} from 'rxjs';
import {configureTestSuite} from 'ng-bullet';
import {MockPipe} from 'ng-mocks';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {CapitalizeFirstPipe} from '../../pipes/capitalize-first.pipe';
import {ROUTES_CONFIG, RoutesConfig} from '../../../configs/routes.config';
import {MatInputModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  const itemCardServiceSpy = jasmine.createSpyObj('ItemCardService', ['getitemCards']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        MockPipe(CapitalizeFirstPipe),
        SearchBarComponent
      ],
      providers: [
        {provide: ItemCardService, useValue: itemCardServiceSpy},
        {provide: ROUTES_CONFIG, useValue: RoutesConfig}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.debugElement.componentInstance;
    itemCardServiceSpy.getitemCards.and.returnValue(of([new ItemCard({name: 'test1', default: true})]));
    fixture.detectChanges();
  });

  it('should create itemCard search component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should filter itemCards array', (() => {
    component.defaultitemCards = [
      new ItemCard({id: 1, name: 'batman', default: true}),
      new ItemCard({id: 2, name: 'spiderman', default: false})
    ];
    expect(component.filteritemCards('batman').length).toBe(1);
    expect(component.filteritemCards('spiderman').length).toBe(0);
    expect(component.filteritemCards('').length).toBe(2);
  }));
});
