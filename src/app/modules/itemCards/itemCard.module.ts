import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ItemCardRoutingModule} from './itemCards-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ItemCardRemoveComponent} from './components/itemCard-remove/itemCard-remove.component';
import {itemCardsListPageComponent} from './pages/itemCards-list-page/itemCards-list-page.component';
import {ItemCardDetailPageComponent} from './pages/itemCard-detail-page/itemCard-detail-page.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ItemCardRoutingModule
  ],
  declarations: [
    itemCardsListPageComponent,
    ItemCardDetailPageComponent,
    ItemCardRemoveComponent
  ],
  entryComponents: [
    ItemCardRemoveComponent
  ]
})

export class itemCardsModule {
}
