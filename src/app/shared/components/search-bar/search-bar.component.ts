import {map, startWith} from 'rxjs/operators';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ItemCard} from '../../../modules/itemCards/shared/itemCard.model';
import {ItemCardService} from '../../../modules/itemCards/shared/itemCard.service';
import {ROUTES_CONFIG} from '../../../configs/routes.config';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {

  defaultitemCards: Array<ItemCard>;
  itemCardFormControl: FormControl;
  filtereditemCards: any;

  constructor(private itemCardService: ItemCardService,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
    this.defaultitemCards = [];
    this.itemCardFormControl = new FormControl();
  }

  ngOnInit() {
    this.itemCardService.getitemCards().subscribe((itemCards: Array<ItemCard>) => {
      this.defaultitemCards = itemCards.filter(itemCard => itemCard.default);

      this.itemCardFormControl.valueChanges.pipe(
        startWith(null as string),
        map(value => this.filteritemCards(value)))
        .subscribe(itemCardsFiltered => {
          this.filtereditemCards = itemCardsFiltered;
        });
    });
  }

  filteritemCards(val: string): ItemCard[] {
    return val ? this.defaultitemCards.filter(itemCard => itemCard.name.toLowerCase().indexOf(val.toLowerCase()) === 0 && itemCard.default)
      : this.defaultitemCards;
  }
}
