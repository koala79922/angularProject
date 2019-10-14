import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ItemCard} from '../../shared/itemCard.model';
import {ItemCardService} from '../../shared/itemCard.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UtilsHelperService} from '../../../../shared/services/utils-helper.service';
import {ItemCardRemoveComponent} from '../../components/itemCard-remove/itemCard-remove.component';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from 'ng-animate';
import {ROUTES_CONFIG} from '../../../../configs/routes.config';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-itemCards-list-page',
  templateUrl: './itemCards-list-page.component.html',
  styleUrls: ['./itemCards-list-page.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: {timing: 1, delay: 0}
    }))])
  ]
})

export class itemCardsListPageComponent implements OnInit {

  itemCards: ItemCard[];
  newItemCardForm: FormGroup;
  canVote = false;
  error: boolean;

  @ViewChild('form', {static: false}) myNgForm; // just to call resetForm method

  constructor(private itemCardService: ItemCardService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router,
              private i18n: I18n,
              private formBuilder: FormBuilder,
              private cookieService: CookieService,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
    this.canVote = this.itemCardService.checkIfUserCanVote();

    this.newItemCardForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      alterEgo: new FormControl('', [Validators.required, Validators.maxLength(30)])
    });

    this.onChanges();
  }

  ngOnInit() {
    this.itemCardService.getitemCards().subscribe((itemCards: Array<ItemCard>) => {
      this.itemCards = itemCards;
    });
  }

  async createNewItemCard() {
    if (this.newItemCardForm.valid) {
      this.itemCardService.createItemCard(new ItemCard(this.newItemCardForm.value)).then(() => {
        this.myNgForm.resetForm();
        this.snackBar.open(this.i18n({value: 'ItemCard created', id: '@@itemCardCreated'}), '', {duration: 1000});
      }, () => {
        this.error = true;
      });
    }
  }

  like(itemCard: ItemCard) {
    this.canVote = this.itemCardService.checkIfUserCanVote();
    if (this.canVote) {
      itemCard.like();
      this.cookieService.put('votes', '' + (Number(this.cookieService.get('votes') || 0) + 1));
      this.itemCardService.updateItemCard(itemCard);
    } else {
      this.snackBar.open(this.i18n({value: 'Can\'t vote anymore', id: '@@cannotVote'}), '', {duration: 1000});
    }
  }

  deleteItemCard(itemCard: ItemCard) {
    const dialogRef = this.dialog.open(ItemCardRemoveComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemCardService.deleteItemCard(itemCard.id).then(() => {
          this.itemCardService.showSnackBar(this.i18n({value: 'ItemCard removed', id: '@@itemCardRemoved'}));
        }, () => {
          this.error = true;
        });
      }
    });
  }

  trackByFn(index: any) {
    return index;
  }

  private onChanges() {
    this.newItemCardForm.get('name').valueChanges.subscribe((value) => {
      if (value && value.length >= 3 && UtilsHelperService.isPalindrome(value)) {
        this.snackBar.open(this.i18n({value: 'Yeah that\'s a Palindrome!', id: '@@yeahPalindrome'}), '', {duration: 2000});
      } else {
        this.snackBar.dismiss();
      }
    });
  }
}
