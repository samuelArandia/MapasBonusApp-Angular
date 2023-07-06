import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsRoutingModule } from './maps-routing.module';

import { MapPagesComponent } from './pages/map-pages/map-pages.component';
import { MapsViewComponent } from './components/maps-view/maps-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnMylocationComponent } from './components/btn-mylocation/btn-mylocation.component';
import { AngularlogoComponent } from './components/angular-logo/angularlogo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';


@NgModule({
  declarations: [
    MapPagesComponent,
    MapsViewComponent,
    LoadingComponent,
    BtnMylocationComponent,
    AngularlogoComponent,
    SearchBarComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ],
  exports: [
    MapPagesComponent
  ]
})
export class MapsModule { }
