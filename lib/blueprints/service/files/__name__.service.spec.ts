import * as angular from 'angular';
<% if (appModulePath) { %>
import { <%= appModuleName %> } from '<%= appModulePath %>';<% } %>
import { <%= moduleName %> } from '<%= modulePath %>';
import { <%= classifiedName %>Service } from '<%= servicePath %>';

describe ('<%= classifiedName %>Service', () => {
  let <%= camelizedName %>Service: <%= classifiedName %>Service;
  <% if (appModulePath) { %>
  beforeEach (angular.mock.module(<%= appModuleName %>));<% } %>
  beforeEach (angular.mock.module(<%= moduleName %>));

  beforeEach(angular.mock.inject(($injector: angular.auto.IInjectorService) => {
    <%= camelizedName %>Service = $injector.get<<%= classifiedName %>Service>('<%= camelizedName %>Service');
  }));

  it ('should create', () => {
    expect(<%= camelizedName %>Service.constructor).toBe(<%= classifiedName %>Service);
  });

});
