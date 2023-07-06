import { Component, inject } from '@angular/core';
import { PlacesServices } from '../../services/places-services.service';
import { Feature } from '../../interfaces/places.interface';
import { MapsServices } from '../../services/maps-services.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  private placesServices = inject( PlacesServices );
  private mapServices = inject( MapsServices );

  public selectedId: string = '';

  get isLoadingPlaces(): boolean{
    return this.placesServices.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesServices.places;
  }

  flyTo( place: Feature): void{
    this.selectedId = place.id;
    const [ lng, lat ] = place.center;
    this.mapServices.flyTo( { lng, lat } );
  }

  showDirections( place: Feature ): void{
    if ( !this.placesServices.userLocation ) throw Error ('User location is not ready');

    this.placesServices.deletePlaces();

    const start = this.placesServices.userLocation;
    const end = place.center as [number, number];

    this.mapServices.getRouteBetweenPoints( start, end );
  }


}
