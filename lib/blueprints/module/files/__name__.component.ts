import { <%= classifiedName %>Controller } from './<%= fileName %>.controller';
import './<%= fileName %>.component.scss';

export const <%= classifiedName %>Component: ng.IComponentOptions = {
  template  : require('./<%= fileName %>.component.html'),
  controller: <%= classifiedName %>Controller
};
