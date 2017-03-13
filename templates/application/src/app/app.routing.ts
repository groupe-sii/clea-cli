export class AppRoutes {

  constructor ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('app', {
      url: '/',
      component: 'app'
    });

  }
}
