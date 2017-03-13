import * as angular from 'angular';

import '../styles/main.scss';

import { AppConfig } from './app.config';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

let module: ng.IModule = angular.module('<%= slugifiedName %>', [
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ui.router',
  'toastr',<% if (bootstrap) { %>
  'ui.bootstrap',<% } else if (ngMaterial) { %>
  'ngMaterial',<% } %>
  'restangular',
  'oc.lazyLoad'
]);

module.constant('ENVIRONNEMENT', ENV);
module.constant('CONFIG', CONFIG);

module.config(AppConfig);
module.config(AppRoutes);

module.component('app', AppComponent);

export const AppModule = module.name;
