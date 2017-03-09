import * as angular from 'angular';

import '../styles/main.scss';

import { ExceptionHandlerConfig } from './exception-handler.config';
import { AppConfig } from './app.config';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

let module: ng.IModule = angular.module('<%= slugify(appName) %>', [
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ui.router',
  'toastr',
  'ngTable',
  'pikaday',
  <% if (bootstrap) { %>
  'ui.bootstrap',
  <% } %>
  <% if (ngMaterial) { %>
  'ngMaterial',
  <% } %>
  'restangular',
  'oc.lazyLoad'
]);

module.constant('ENVIRONNEMENT', ENV);
module.constant('CONFIG', CONFIG);

module.config(ExceptionHandlerConfig);
module.config(AppConfig);
module.config(AppRoutes);

module.component('app', AppComponent);

export const AppModule = module.name;
