import { Component, inject } from '@angular/core';
import { MapsServices } from '../../services/maps-services.service';
import { PlacesServices } from '../../services/places-services.service';

@Component({
  selector: 'app-btn-mylocation',
  templateUrl: './btn-mylocation.component.html',
  styleUrls: ['./btn-mylocation.component.css']
})
export class BtnMylocationComponent {

  private mapService = inject(MapsServices);
  private placeServices = inject(PlacesServices);

  goToMyLocation() {

    if ( !this.placeServices.isUserLocationReady  ) throw new Error('User location not ready');
    if ( !this.mapService.isMapReady  ) throw new Error('Map is not ready');

    this.mapService.flyTo( this.placeServices.userLocation! );
  }

}
