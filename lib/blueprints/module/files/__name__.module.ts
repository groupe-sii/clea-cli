'use strict';

import * as angular from 'angular';

let module: ng.IModule = angular.module('<%= dasherizedName %>', []);

export const <%= classifiedName %>Module = module.name;
