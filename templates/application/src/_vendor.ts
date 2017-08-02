import 'angular';
import 'angular-animate';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-messages';
import 'angular-aria';
import 'angular-cookies';<% if (ngMaterial) { %>
import 'angular-material';<% } else if (bootstrap) { %>
import 'angular-touch';
import 'angular-ui-bootstrap';<% } %>
import '@uirouter/angularjs';
import 'restangular';
import 'oclazyload';

/// <reference path="custom-typings.d.ts" />
