import * as angular from 'angular';
<% if (appModulePath) { %>
import { <%= appModuleName %> } from '<%= appModulePath %>';<% } %>
import { <%= moduleName %> } from '<%= modulePath %>';

describe ('<%= classifiedName %>Filter', () => {
  let <%= camelizedName %>Filter;
  <% if (appModulePath) { %>
  beforeEach (angular.mock.module(<%= appModuleName %>));<% } %>
  beforeEach (angular.mock.module(<%= moduleName %>));

  beforeEach (angular.mock.inject(($filter: angular.IFilterService) => {
    <%= camelizedName %>Filter = $filter('<%= camelizedName %>');
  }));

  it ('should create', () => {
    expect(<%= camelizedName %>Filter(null)).toEqual(null);
  });

});
