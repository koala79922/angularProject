import {Component, OnInit} from '@angular/core';
import {ItemCard} from '../../modules/itemCards/shared/itemCard.model';
import {ItemCardService} from '../../modules/itemCards/shared/itemCard.service';
import {AppConfig} from '../../configs/app.config';
import {Observable} from 'rxjs';
import {defaultIfEmpty, map} from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  itemCards$: Observable<ItemCard[]>;

  constructor(private itemCardService: ItemCardService) {
  }

  ngOnInit() {
    this.itemCards$ = this.itemCardService.getitemCards().pipe(
      map((itemCards) => itemCards.slice(0, AppConfig.topitemCardsLimit)),
      defaultIfEmpty([])
    );
  }
}
