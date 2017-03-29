import * as angular from 'angular';
<% if (appModulePath) { %>
import { <%= appModuleName %> } from '<%= appModulePath %>';<% } %>
import { <%= moduleName %> } from '<%= modulePath %>';

describe ('<%= classifiedName %>Directive', () => {
  let element;

  angular.mock.module.sharedInjector();
  <% if (appModulePath) { %>
  beforeAll (angular.mock.module(<%= appModuleName %>));<% } %>
  beforeAll (angular.mock.module(<%= moduleName %>));

  beforeAll (angular.mock.inject(($compile: angular.ICompileService, $rootScope: angular.IRootScopeService) => {
    element = $compile('<div <%= camelizedName %>="attr"></div>')($rootScope);

    $rootScope.$digest();
  }));

  it ('should have an attribute', () => {
    expect(element.attr('<%= camelizedName %>')).toEqual('attr');
  });

});
