import {Component, OnInit} from '@angular/core';
import {ItemCard} from '../../shared/itemCard.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from 'ng-animate';
import {RoutesConfig} from '../../../../configs/routes.config';

@Component({
  selector: 'app-itemCard-detail-page',
  templateUrl: './itemCard-detail-page.component.html',
  styleUrls: ['./itemCard-detail-page.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: {timing: 1, delay: 0}
    }))])
  ]
})

export class ItemCardDetailPageComponent implements OnInit {

  itemCard: ItemCard;

  constructor(private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.itemCard = this.activatedRoute.snapshot.data.itemCard;
  }

  goBack(): void {
    this.location.back();
  }

  goToTheAnchor(): void {
    this.router.navigate([RoutesConfig.routes.itemCards.detail(this.itemCard.id)], {fragment: 'itemCarde-detail'});
  }
}
