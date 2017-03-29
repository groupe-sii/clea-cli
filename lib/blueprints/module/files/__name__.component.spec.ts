import * as angular from 'angular';
<% if (appModulePath) { %>
import { <%= appModuleName %> } from '<%= appModulePath %>';<% } %>
import { <%= classifiedName %>Module } from './<%= fileName %>.module';

describe ('<%= classifiedName %>Component', () => {
  let <%= camelizedName %>Controller;

  angular.mock.module.sharedInjector();
  <% if (appModulePath) { %>
  beforeAll (angular.mock.module(<%= appModuleName %>));<% } %>
  beforeAll (angular.mock.module(<%= classifiedName %>Module));

  beforeAll (angular.mock.inject(($componentController: angular.IComponentControllerService) => {
    <%= camelizedName %>Controller = $componentController('<%= camelizedName %>', {}, {});
  }));

  it ('should create', () => {
    expect(<%= camelizedName %>Controller).toBeTruthy();
  });

});
