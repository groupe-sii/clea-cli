export class AppConfig {

  constructor ($locationProvider: ng.ILocationProvider, $compileProvider: ng.ICompileProvider, pikadayConfigProvider, RestangularProvider: Restangular.IProvider, $ocLazyLoadProvider: oc.ILazyLoadProvider, CONFIG, ENVIRONNEMENT: String) {
    'ngInject';

    // Reference: https://github.com/mgonto/restangular#setbaseurl
    RestangularProvider.setBaseUrl(CONFIG.BASE_URL);

    // Reference: https://oclazyload.readme.io/docs/oclazyloadprovider
    $ocLazyLoadProvider.config({
      debug: ENVIRONNEMENT !== 'prod' && ENVIRONNEMENT !== 'production'
    });

    // Reference: https://docs.angularjs.org/api/ng/provider/$locationProvider#html5Mode
    $locationProvider.html5Mode(true);

    // Reference : http://blog.thoughtram.io/angularjs/2014/12/22/exploring-angular-1.3-disabling-debug-info.html
    $compileProvider.debugInfoEnabled(ENVIRONNEMENT !== 'prod' && ENVIRONNEMENT !== 'production');

    let locales = {
      fr: {
        previousMonth: 'Mois précédent',
        nextMonth    : 'Mois suivant',
        months       : [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octoble', 'Novembre', 'Décembre' ],
        weekdays     : [ 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche' ],
        weekdaysShort: [ 'Lu.', 'Ma.', 'Me.', 'Je.', 'Ve.', 'Sa.', 'Di.' ]
      }
    };

    pikadayConfigProvider.setConfig({
      i18n   : locales.fr,
      locales: locales,
      format : 'DD/MM/YYYY'

    });
  }
}
