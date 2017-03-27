import * as angular from 'angular';

import '../styles/main.scss';

import { AppConfig } from './app.config';
import { AppRoutes } from './app.routing';<% if (pwa) { %>
import { AppServiceWorker } from './app.sw';<% } %>
import { AppComponent } from './app.component';

let module: ng.IModule = angular.module('<%= slugifiedName %>', [
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ngCookies',<% if (ngMaterial) { %>
  'ngMaterial',<% } else if (bootstrap) { %>
  'ngTouch',
  'ui.bootstrap',<% } %>
  'ui.router',
  'restangular',
  'oc.lazyLoad'
]);

module.constant('ENVIRONMENT', ENV);
module.constant('CONFIG', CONFIG);

module.config(AppConfig);
module.config(AppRoutes);<% if (pwa) { %>
module.run(AppServiceWorker);<% } %>

module.component('app', AppComponent);

export const AppModule = module.name;
