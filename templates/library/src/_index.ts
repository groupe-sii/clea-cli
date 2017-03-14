import * as angular from 'angular';
import './assets/styles/main.scss';

let dependencies: Array<string> = [];

export const <%= appName %> = angular.module('<%= slugifiedName %>', dependencies).name;
