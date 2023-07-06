import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtdWVsYXJhbmRpYSIsImEiOiJjbGpmd25yY3owNGo3M3BxdjUyY216ZndyIn0.CjOEXdN58R8BtNmP_mnRJA';

if ( !navigator.geolocation ) {
  alert('Geolocation not available');
  throw new Error('Geolocation not available');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
