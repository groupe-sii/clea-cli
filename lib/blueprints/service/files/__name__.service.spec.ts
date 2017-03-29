import * as angular from 'angular';
<% if (appModulePath) { %>
import { <%= appModuleName %> } from '<%= appModulePath %>';<% } %>
import { <%= moduleName %> } from '<%= modulePath %>';
import { <%= classifiedName %>Service } from './<%= fileName %>.service';

describe ('<%= classifiedName %>Service', () => {
  let <%= camelizedName %>Service: <%= classifiedName %>Service;

  angular.mock.module.sharedInjector();
  <% if (appModulePath) { %>
  beforeAll (angular.mock.module(<%= appModuleName %>));<% } %>
  beforeAll (angular.mock.module(<%= moduleName %>));

  beforeAll (angular.mock.inject(($injector: angular.auto.IInjectorService) => {
    <%= camelizedName %>Service = $injector.get<<%= classifiedName %>Service>('<%= camelizedName %>Service');
  }));

  it ('should create', () => {
    expect(<%= camelizedName %>Service).toBeTruthy();
  });

});
