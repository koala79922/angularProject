import {ItemCardRemoveComponent} from './itemCard-remove.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {configureTestSuite} from 'ng-bullet';
import {MatDialogModule} from '@angular/material/dialog';

describe('ItemCardRemoveComponent', () => {
  let component: ItemCardRemoveComponent;
  let fixture: ComponentFixture<ItemCardRemoveComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [
        ItemCardRemoveComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardRemoveComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', (() => {
    expect(component).toBeTruthy();
  }));
});
