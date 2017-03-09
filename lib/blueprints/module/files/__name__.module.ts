'use strict';

import * as angular from 'angular';

let dependencies = [];

let module: ng.IModule = angular.module('<%= dasherizedName %>', dependencies);

export const <%= classifiedName %>Module = module.name;
