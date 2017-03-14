export class AppConfig {

  constructor (
    $locationProvider: ng.ILocationProvider,
    $compileProvider: ng.ICompileProvider,
    $ocLazyLoadProvider: oc.ILazyLoadProvider,
    RestangularProvider: Restangular.IProvider,
    CONFIG,
    ENVIRONMENT: String
  ) {
    'ngInject';

    // Reference: https://docs.angularjs.org/api/ng/provider/$locationProvider#html5Mode
    $locationProvider.html5Mode(true);

    // Reference : http://blog.thoughtram.io/angularjs/2014/12/22/exploring-angular-1.3-disabling-debug-info.html
    $compileProvider.debugInfoEnabled(ENVIRONMENT !== 'prod' && ENVIRONMENT !== 'production');

    // Reference: https://oclazyload.readme.io/docs/oclazyloadprovider
    $ocLazyLoadProvider.config({
      debug: ENVIRONMENT !== 'prod' && ENVIRONMENT !== 'production'
    });

    // Reference: https://github.com/mgonto/restangular#setbaseurl
    RestangularProvider.setBaseUrl(CONFIG.BASE_URL);
  }
}
