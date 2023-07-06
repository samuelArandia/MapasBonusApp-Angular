import { Component, OnInit, inject } from '@angular/core';
import { PlacesServices } from '../../services/places-services.service';

@Component({
  selector: 'map-pages-component',
  templateUrl: './map-pages.component.html',
  styleUrls: ['./map-pages.component.css']
})
export class MapPagesComponent {

  private placesServices = inject(PlacesServices)

  get isUserLocationReady(): boolean {
    return this.placesServices.isUserLocationReady;
  }

}
