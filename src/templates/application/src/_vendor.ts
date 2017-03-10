import 'angular';
import 'angular-animate';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-messages';
import 'angular-aria';
import 'angular-ui-router';
import 'angular-mocks';
import 'angular-toastr';
import 'ng-table';
import 'moment';
import 'pikaday-angular';
import 'restangular';
import 'oclazyload';
<% if (ngMaterial) { %>
import 'angular-material';
import 'material-design-icons';
<% } %>
<% if (bootstrap) { %>
import 'angular-ui-bootstrap';
<% } %>

/// <reference path="custom-typings.d.ts" />
