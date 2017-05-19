import * as angular from 'angular';
<% if (appModulePath) { %>
import { <%= appModuleName %> } from '<%= appModulePath %>';<% } %>
import { <%= moduleName %> } from '<%= modulePath %>';

describe ('<%= classifiedName %>Filter', () => {
  let <%= camelizedName %>Filter;

  angular.mock.module.sharedInjector();
<% if (appModulePath) { %>
  beforeAll (angular.mock.module(<%= appModuleName %>));<% } %>
  beforeAll (angular.mock.module(<%= moduleName %>));

  beforeAll (angular.mock.inject(($filter: angular.IFilterService) => {
    <%= camelizedName %>Filter = $filter('<%= camelizedName %>');
  }));

  it ('should create', () => {
    expect(<%= camelizedName %>Filter(null)).toEqual(null);
  });

});
