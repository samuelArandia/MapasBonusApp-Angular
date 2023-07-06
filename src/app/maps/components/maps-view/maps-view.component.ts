import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { PlacesServices } from '../../services/places-services.service';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapsServices } from '../../services/maps-services.service';

@Component({
  selector: 'app-maps-view',
  templateUrl: './maps-view.component.html',
  styleUrls: ['./maps-view.component.css']
})
export class MapsViewComponent implements AfterViewInit{

  @ViewChild('mapDiv')
  mapDivElement! : ElementRef;

  private placesServices = inject(PlacesServices)
  private mapServices= inject(MapsServices)

  ngAfterViewInit(): void {

    if ( !this.placesServices.userLocation ) throw new Error('User location not ready');

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesServices.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });

    const popup = new Popup()
      .setHTML(
        `
        <h6>Aqui estoy</h6>
        <span>Estoy en este lugar del mundo</span>
        `
      );

    new Marker({ color: 'red' })
      .setLngLat( this.placesServices.userLocation )
      .setPopup( popup )
      .addTo( map );

    this.mapServices.setMap( map );
  }



}
