import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {RoutesConfig} from './configs/routes.config';

const routesNames = RoutesConfig.routesNames;

const routes: Routes = [
  {path: routesNames.home, component: HomePageComponent, pathMatch: 'full'},
  {path: routesNames.itemCards.basePath, loadChildren: () => import('./modules/itemCards/itemCard.module').then(m => m.itemCardsModule)},
  {path: 'page2', component: HomePageComponent },
  {path: 'page3', component: HomePageComponent },
  {path: 'page4', component: HomePageComponent },
  {path: routesNames.error404, component: Error404PageComponent},
  {path: '**', redirectTo: RoutesConfig.routes.error404}// otherwise redirect to 404
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
