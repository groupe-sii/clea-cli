# Introduction 

**Avant de commencer**

Avant de faire un validateur personnalisé, il faut se poser la question suivante: "Est-ce que je vais en avoir besoin à plusieurs endroits ou dans d'autres applications ?"

En effet, si vous voulez faire un contrôle sur un champ pour valider une règle métier qui n'a de sens que dans un écran, alors il est surement plus intéressant de valider cette règle dans le contrôleur de l'écran.

La première chose a savoir est qu'un validateur AngularJS est en réalité une directive qui ajoute une nouvelle fonction de validation dans l'object \$validators du modèle du composant sur lequel est appliqué la
directive.

```js
ngModel.$validators.monValidateur = (modelValue, viewValue) => MonValidateur.maFonctionDeValidation(scope, viewValue);
``` 

Le prérequis d'une méthode de validation est qu'elle doit accepter un paramètre "modelValue" et un paramètre "viewValue" et qu'elle doit retourner un booléen. Le paramètre modelValue contient la valeur de la
proprieté du ng-model bindée sur le composant. Le paramètre viewValue contient la valeur saisie dans le composant

L'ajout du validateur se fait dans la fonction "link" de la directive.

```js
public link:Function = (scope:SampleScopeInterface,
 element:ng.IAugmentedJQuery,
 attributes:ng.IAttributes,
 ngModel:SampleModelInterface):void => {
 ngModel.$validators.nameNotUsed = (modelValue, viewValue) =>
 SampleNameValidator.nameNotUsed(scope, viewValue);
};
``` 

# Création pas à pas d'un validateur

Le validateur que nous allons créer permet de contrôler que le nom saisie dans un input[text] n'est pas déjà utilisé.

Nous allons commencer par créer une classe SampleNameValidator qui implémente l'interface ng.IDirective dans un nouveau fichier sampleNameValidator.ts

```js
import 'angular';
import IPromise = angular.IPromise;
/**
 * Sample Name Validator. Check if the text type in the current web control is not
used
 */
export class SampleNameValidator implements ng.IDirective {
 'use strict';
 public restrict = 'A';
 public require = 'ngModel';
 public scope = {namesCollection: '=names'};
 public static $inject = [];
}
``` 

-   La propriété restrict = 'A' permet de restreindre l'utilisation de notre directive au mode "attribut" (Il y a aussi 'E' pour 'element', 'C' pour 'class' et 'M' pour 'comment' mais pour un validateur ce n'est pas courant de les utiliser).
-   La propriété require='ngModel' permet de lever une erreur si le ngModel n'est pas indiqué sur le composant. Le modèle nous est indispensable puisque nous devons ajouter une nouvelle méthode de validation sur son object \$validators.
-   La propriété statique \$inject = [] permet l'ajout d'autre services, directives, etc. d'AngularJS.
-   La propriété scope = {namesCollection: '=names'} indique que nous voulons utiliser un scope local à la directive et qu'il doit contenir la valeur de l'attribut "names" positionné sur notre input[text].

```js
<input type="text" class="form-control" name="name" id="name"
ng-model="jediCtrl.jedi.name" sample-name-validator
names="jediCtrl.names">
}
``` 

La propriété "namesCollection" du scope n'est pas connu dans l'interface ng.IScope, il faut donc créer une nouvelle interface qui hérite de ng.IScope

```js
/**
 * Interface to custom the default scope
 * Add the property 'namesCollection'
 */
export interface SampleScopeInterface extends ng.IScope {
 /**
 * @property namesCollection Array<string> Collection of used names
 */
 namesCollection: Array<string>;
}
``` 

Il faut maintenant écrire notre méthode de validation. Cette méthode a besoin du scope pour lire la collection de noms et elle a besoin de la valeur saisie dans le champ texte du formulaire.

Dans la classe SampleNameValidator, ajouter :

```js
/**
 * Regex to replace any character that is not a letter or a digit
 * @type {RegExp}
 */
public static regex:RegExp = /[\W_]/gi;
/**
 * Check if the name type in the current web control is not used
 * @param scope SampleScopeInterface Scope of the validator
 * @param viewValue any Value of the textbox
 * @return isValid boolean True if the name is not used
 */
public static nameNotUsed:Function = (scope:SampleScopeInterface ,
viewValue:any):boolean => (
 !scope.namesCollection ||
 scope.namesCollection.length === 0 ||
 scope.namesCollection.map(
 name => name.toUpperCase().replace(SampleNameValidator.regex, '')
 ).indexOf(viewValue.toUpperCase().replace(SampleNameValidator.regex, '')) === -1);
``` 

La méthode de validation étant écrite, il faut maintenant l'ajouter à l'objet \$validators du modèle. Pour cela nous créons un nouvelle méthode "link" dans la classe SampleNameValidator. La méthode "link" d'une directive prend en paramètre le scope (ici un SampleScopeInterface), l'élément HTML (ici notre input[text]), les attributs de l'élément HTML et le ngModel de l'élément HTML.

```js
public link:Function = (scope:SampleScopeInterface,
 element:ng.IAugmentedJQuery,
 attributes:ng.IAttributes,
 ngModel:SampleModelInterface):void => {
 /**
 * Check if the name type in the current web control is not used
 * @param modelValue any Value of the model property
 * @param viewValue any Value of the current web control
 * @return isValid boolean True if the name is not used
 */
 ngModel.$validators.nameNotUsed = (modelValue, viewValue) =>
 SampleNameValidator.nameNotUsed(scope, viewValue);
};
``` 

Vous avez sûrement remarqué que le type du ngModel passé en paramètre est un SampleModelInterface. En effet, de base, l'interface ng.INgModelController contient une propriété \$validators qui est du type ng.IModelValidators hors ce type ne contient pas de validateur "nameNotUsed". Il faut donc ajouter deux nouvelles interfaces pour que le projet puisse compiler.

```js
/**
 * Interface to custom the default Validator
 * Add the method 'nameNotUsed'
 */
export interface SampleModelValidatorsInterface extends ng.IModelValidators {
 /**
 * @method nameNotUsed Method to check if the name type in the current web control
is not used
 * @param modelValue any Value of the model property
 * @param viewValue any Value of the current web control
 * @return isValid boolean True if the name is not used
 */
 nameNotUsed: (modelValue:any, viewValue:any) => boolean;
}
/**
 * Interface to custom the default model
 * Set the default validator's type to SampleModelValidatorsInterface
 */
export interface SampleModelInterface extends ng.INgModelController {
 $validators: SampleModelValidatorsInterface;
}
}
``` 

Il reste une dernière étape pour finaliser notre validateur, il faut l'ajouter dans les modules AngularJS.

AngularJS attend une instance de classe lors de la déclaration d'une nouvelle directive. Il nous faut donc ajouter à notre classe un factory pour pouvoir construire l'instance de notre validateur :
```js
/**
 * Factory for getting an instance of SampleNameValidator
 * @returns {function(): SampleNameValidator}
 * @constructor
 */
public static Factory():ng.IDirectiveFactory {
 const directive = () => new SampleNameValidator();
 directive.$inject = SampleNameValidator.$inject;
 return directive;
}
``` 

Il est maintenant possible de déclarer la directive dans un module AngularJS (le code est à placer dans le module mais en dehors de la classe)

```js
export default angular
 .module('sii.sample', [])
 .directive('sampleNameValidator', SampleNameValidator.Factory())
 .name;
``` 

Et voila la directive de validation est prête. Pour l'utiliser il suffit de l'ajouter en dépendance dans l'application cible :

```js
import SampleNameValidator from
'sample-name-validator_sample-name-validator';
angular
 .module('sii.core', [
 'ngResource',
 'hateoas',
 SampleNameValidator
 ]);
``` 

