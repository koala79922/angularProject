import {ChangeDetectionStrategy, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {ItemCardService} from '../../../modules/itemCards/shared/itemCard.service';
import {ItemCard} from '../../../modules/itemCards/shared/itemCard.model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from 'ng-animate';
import {ROUTES_CONFIG} from '../../../configs/routes.config';
import {CookieService} from 'ngx-cookie';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-itemCard-card',
  templateUrl: './itemCard-card.component.html',
  styleUrls: ['./itemCard-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: {timing: 1, delay: 0}
    }))])
  ]
})
export class ItemCardCardComponent implements OnInit {

  @Input() itemCard: ItemCard;

  canVote: boolean;
  isBrowser: boolean;

  constructor(private itemCardService: ItemCardService,
              private router: Router,
              private snackBar: MatSnackBar,
              private i18n: I18n,
              private cookieService: CookieService,
              @Inject(PLATFORM_ID) private platformId: object,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.canVote = this.itemCardService.checkIfUserCanVote();
  }

  like(itemCard: ItemCard): Promise<void> {
    if (this.canVote) {
      itemCard.like();
      this.cookieService.put('votes', '' + (Number(this.cookieService.get('votes') || 0) + 1));
      return this.itemCardService.updateItemCard(itemCard);
    } else {
      this.snackBar.open(this.i18n({value: 'Can\'t vote anymore', id: '@@cannotVote'}), '', {duration: 1000});
    }
  }

}
