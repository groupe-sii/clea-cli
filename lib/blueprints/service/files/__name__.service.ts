export class <%= classifiedName %>Service {
  <% if (resource) { %>resource: Restangular.IElement;
  <% } %>
  constructor (<% if (resource) { %>Restangular<% } %>) {
    'ngInject';

    <% if (resource) { %>this.resource = Restangular.one('<%= resource %>');<% } %>
  }
  <% if (resource) { %>
  /**
   * @ngdoc method
   * @name <%= classifiedName %>Service#getAll
   * @description
   * TODO <%= classifiedName %>Service#getAll to complete
   *
   * @returns {Promise<Array>}
   */
  getAll () {
    return this.resource.getList();
  }

  /**
   * @ngdoc method
   * @name <%= classifiedName %>Service#get
   * @description
   * TODO <%= classifiedName %>Service#get to complete
   *
   * @param   {number}            id
   * @returns {Promise<Object>}
   */
  get (id) {
    return this.resource.one(id).get();
  }

  /**
   * @ngdoc method
   * @name <%= classifiedName %>Service#post
   * @description
   * TODO <%= classifiedName %>Service#post to complete
   *
   * @param   {Object}            <%= resourceVar %>
   * @returns {Promise<Object>}
   */
  post (<%= resourceVar %>) {
    return this.resource.customPOST(<%= resourceVar %>);
  }

  /**
   * @ngdoc method
   * @name <%= classifiedName %>Service#put
   * @description
   * TODO <%= classifiedName %>Service#put to complete
   *
   * @param   {number}            id
   * @param   {Object}            <%= resourceVar %>
   * @returns {Promise<Object>}
   */
  put (id, <%= resourceVar %>) {
    return this.resource.one(id).customPUT(<%= resourceVar %>);
  }

  /**
   * @ngdoc method
   * @name <%= classifiedName %>Service#remove
   * @description
   * TODO <%= classifiedName %>Service#remove to complete
   *
   * @param   {number}            id
   * @returns {Promise<Object>}
   */
  remove (id) {
    return this.resource.one(id).remove();
  }
  <% } %>
}
