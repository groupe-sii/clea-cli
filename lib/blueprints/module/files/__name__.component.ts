import './<%= fileName %>.component.scss';

export class <%= classifiedName %>Controller {

  constructor () { 'ngInject'; }

  $onInit () {}

}

export const <%= classifiedName %>Component: ng.IComponentOptions = {
  template  : require('./<%= fileName %>.component.html'),
  controller: <%= classifiedName %>Controller
};
