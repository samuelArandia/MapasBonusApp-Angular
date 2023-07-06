import { Component, inject } from '@angular/core';
import { PlacesServices } from '../../services/places-services.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private debounceTimer? : NodeJS.Timeout;
  private placesServices = inject(PlacesServices);

  onQuerySearch( query: string = '') {
    console.log('query', query);

    if ( this.debounceTimer ) clearTimeout( this.debounceTimer);

    this.debounceTimer = setTimeout( () => {
      this.placesServices.getPlacesByQuery( query );
    }
    , 500);
  }

}
