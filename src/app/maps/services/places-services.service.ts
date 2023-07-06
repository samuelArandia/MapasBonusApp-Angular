
import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api';
import { MapsServices } from './maps-services.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesServices {

  private placesApi = inject(PlacesApiClient)
  private mapServices = inject(MapsServices);

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.latitude, coords.longitude];
          resolve([coords.latitude, coords.longitude]);
        },
        (err) => {
          alert('No se pudo obtener la ubicación');
          console.log(err);
          reject();
        }
        )
    })
  }

  getPlacesByQuery ( query: string = '' ) {

    if ( query.length === 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    if ( !this.userLocation ) return console.log('No hay ubicación')

    this.isLoadingPlaces = true;

    return this.placesApi.get<PlacesResponse>( `/${query}.json`, {
      params: {
        proximity: this.userLocation.join(','),
      }
    })
      .subscribe( respo => {
        console.log('respo places-services', respo.features);
        this.isLoadingPlaces = false;
        this.places = respo.features;
        this.mapServices.createMarkersFromPlaces( this.places, this.userLocation! );
      } )
  }

  deletePlaces () {
    this.places = [];
  }


}
