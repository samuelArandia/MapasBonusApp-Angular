import { Injectable, inject } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places.interface';
import { DirectionsApiClient } from '../api';
import { DirectionResponse, Route } from '../interfaces/directions.interface';

@Injectable({
  providedIn: 'root'
})
export class MapsServices {

  private directionsApi = inject(DirectionsApiClient);

  private map: Map | undefined;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo( coords: LngLatLike ) {
    if ( !this.isMapReady ) throw Error ('Map is not ready');

    this.map?.flyTo({
      zoom: 12,
      center: coords
    });
  }

  createMarkersFromPlaces( places: Feature[], userLocation: [number, number] ){

    if ( !this.map ) throw Error ('Map is not ready');

    this.markers.forEach( marker => marker.remove() );
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [ lng, lat ] = place.center;
      const popup = new Popup()
        .setHTML(
          `
          <h3>${place.text}</h3>
          <p>${place.place_name}</p>
          `
        )
      const newMarker = new Marker()
        .setLngLat( [ lng, lat ] )
        .setPopup( popup )
        .addTo( this.map );

      newMarkers.push( newMarker );
    }

    this.markers = newMarkers;

    if ( places.length === 0 ) return;
    // limites de mpas
    const bounds = new LngLatBounds();

    newMarkers.forEach( marker => bounds.extend( marker.getLngLat() ) );
    bounds.extend( userLocation );

    this.map.fitBounds(bounds, { padding: 200 });
  }

  getRouteBetweenPoints( start: [number, number], end: [number, number ] ) {

    this.directionsApi.get<DirectionResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe( resp => {
        console.log(resp);
        this.drawPolyLine( resp.routes[0] );
      });

    return;
  }

  private drawPolyLine( route: Route ) {

    console.log({ kms: route.distance / 1000, minutes: route.duration /60 });

    if ( !this.map ) throw Error ('Map is not ready');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();

    coords.forEach( ( [lng, lat] ) => {
       bounds.extend( [lng, lat] )
    });

    this.map?.fitBounds( bounds, {
      padding: 200
    });

    // Polyline - crear la linea
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if ( this.map.getLayer('routeString') ) {
      this.map.removeLayer('routeString')
      this.map.removeSource('routeString')
    }


    this.map.addSource('routeString', sourceData);
    this.map.addLayer({
      id: 'routeString',
      type: 'line',
      source: 'routeString',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#33CCFF',
        'line-width': 3
      }
    })

  }

}
