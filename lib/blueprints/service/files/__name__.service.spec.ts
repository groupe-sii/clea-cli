import * as angular from 'angular';
import { <%= moduleName %> } from '<%= modulePath %>';

import { <%= classifiedName %>Service } from '<%= servicePath %>';

describe ('<%= classifiedName %>Service', () => {
  let <%= camelizedName %>Service: <%= classifiedName %>Service;

  beforeEach (angular.mock.module(<%= moduleName %>));

  beforeEach(angular.mock.inject(($injector: angular.auto.IInjectorService) => {
    <%= camelizedName %>Service = $injector.get<<%= classifiedName %>Service>('<%= classifiedName %>Service');
  }));

  it ('should create', () => {
    expect(<%= camelizedName %>Service.constructor).toBe(<%= classifiedName %>Service);
  });

});
