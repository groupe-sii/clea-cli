import * as angular from 'angular';
<% if (appModulePath) { %>
import { <%= appModuleName %> } from '<%= appModulePath %>';<% } %>
import { <%= moduleName %> } from '<%= modulePath %>';
import { <%= classifiedName %>Component } from './<%= fileName %>.component';

describe ('<%= classifiedName %>Component', () => {
  let <%= camelizedName %>Controller;
  <% if (appModulePath) { %>
  beforeEach (angular.mock.module(<%= appModuleName %>));<% } %>
  beforeEach (angular.mock.module(<%= moduleName %>));

  beforeEach (angular.mock.inject(($componentController: angular.IComponentControllerService) => {
    <%= camelizedName %>Controller = $componentController('<%= camelizedName %>', {}, {});
  }));

  it ('should create', () => {
    expect(<%= classifiedName %>Component).toBeTruthy();
  });

});
