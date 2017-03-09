export class ExceptionHandlerConfig {

  constructor ($provide: ng.auto.IProvideService) {
    'ngInject';
    $provide.decorator('$exceptionHandler', ($delegate: (exception, cause) => void/*, $injector: ng.auto.IInjectorService*/) => {
      return (exception, cause) => {
        //TODO: send error to server
        $delegate(exception, cause);
      }
    })
  }
}
