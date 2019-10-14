import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {itemCardsListPageComponent} from './pages/itemCards-list-page/itemCards-list-page.component';
import {ItemCardDetailPageComponent} from './pages/itemCard-detail-page/itemCard-detail-page.component';
import {ItemCardResolver} from './shared/itemCard.resolver';

const itemCardsRoutes: Routes = [
  {path: '', component: itemCardsListPageComponent},
  {
    path: ':id',
    component: ItemCardDetailPageComponent,
    resolve: {itemCard: ItemCardResolver}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(itemCardsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ItemCardResolver
  ]
})

export class ItemCardRoutingModule {
}
