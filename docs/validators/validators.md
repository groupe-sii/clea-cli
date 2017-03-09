# Introduction

AngularJS met à disposition des développeurs des outils de validation de formulaire coté client.

AngularJS se charge de surveiller l'état de validité du formulaire et de ses champs "input" et laisse à la charge du développeur le fait de notifier cet état à l'utilisateur.

# État du formulaire et de ses champs


AngularJS met à disposition des informations supplémentaires à propos du formulaire et de ses champs "input" (Non utilisé, Utilisé, Modifié, Valide, Invalide, Quitté)

|Propriété|Classe |Description|
|--- |--- |--- |
|$valid|ng-valid|Booléen Indique que l’élément est actuellement valide en se basant sur les règles définies par le développeur.|
|$invalid|ng-invalid|Booléen Indique que l’élément est actuellement non-valide en se basant sur les règles définies par le développeur.|
|$pristine|ng-pristine|Booléen Vrai si le formulaire ou l'input n'a pas encore été utilisé|
|$dirty|ng-dirty|Booléen Vrai si le formulaire ou l'input a été modifié|
|$touched|ng-touched|Booléen Vrai si le composant à perdu le focus (onblur)|


Les propriétés AngularJS sont utilisables via la notation suivante :

-   pour le formulaire `<nom formulaire>.<propriété AngularJS>`

```js
<button
 type="submit"
 class="btn btn-primary"
 ng-disabled="jediForm.$invalid">Create</button>
```
-   pour un champ du
    formulaire `<nom formulaire>.<nom input>.<propriété AngularJS>`
```js
<span class="alert warning" ng-show="jediForm.name.$touched &&
jediForm.name.$error.required">Hey, don't forget to give a name to your jedi!</span>
```

# Validation du formulaire et de ses champs


**Attention**

HTML5 dispose par défaut d'un système de validation des formulaires. Il est conseillé de ne pas mixer la validation HTML5 et la validation AngularJS. Pour désactiver la validation HTML5, il faut ajouter l'attribut "novalidate" sur la balise "form".

```js
<form ng-submit="jediCtrl.create(jediForm.$valid)" name="jediForm" novalidate>
```

AngularJS propose par défaut pour les champs de type "input" et "select" des validateurs. Ils s'appliquent sur les composants via des attributs spécifiques.
 
Le non-respect d'un validateur ajoute automatiquement une propriété dans l'objet \$error du formulaire et du composant ainsi que des classes CSS pour pouvoir intéragir avec l'utilisateur.

Les validateurs ne fonctionnent que si l'attribut "ng-model" est placé sur le champ.

##ng-minlength


Invalide le formulaire et le champ si la longueur minimum n'est pas respectée. Ce validateur ne peut être utilisé que sur les champs de type texte.

```js
<input type="text" class="form-control" name="name" id="name" placeholder="Name"
ng-model="jediCtrl.jedi.name" ng-minlength="3" />
```

Le non respect du validateur ajoute la propriété "minlength" à l'objet "\$error" du composant et du formulaire. Ainsi, on peut s'appuyer sur l'existence de cette propriété pour faire apparaître un message d'erreur.

```js
<span class="alert warning" ng-show="jediForm.name.$error.minlength">The name of the
Jedi can not be too short!</span>
```

Le non respect du validateur ajoute les classes CSS "ng-invalid-minlength" et "ng-invalid" sur le composant et le formulaire

```js
<input type="text" class="form-control ng-invalid ng-invalid-minlength ng-touched"
name="name" id="name" placeholder="Name" ng-model="jediCtrl.jedi.name"
ng-minlength="3" />
```

[Documentation AngularJS
(ngMinlength)](https://docs.angularjs.org/api/ng/directive/ngMinlength)

## ng-maxlength

Invalide le formulaire et le champ si la longueur maximum n'est pas respectée. Ce validateur ne peut être utilisé que sur les champs de type texte.

```js
<input type="text" class="form-control" name="name" id="name" placeholder="Name"
ng-model="jediCtrl.jedi.name" ng-maxlength="20" />
```

Le non-respect du validateur ajoute la propriété "maxlength" à l'objet "\$error" du composant et du formulaire. Ainsi, on peut s'appuyer sur l'existence de cette propriété pour faire apparaître un message d'erreur.

```js
<span class="alert warning" ng-show="jediForm.name.$error.maxlength">This Jedi name is
too long!</span>
```

Le non-respect du validateur ajoute les classes CSS "ng-invalid-maxlength" et "ng-invalid" sur le composant et le formulaire

```js
<input type="text" class="form-control ng-invalid ng-invalid-maxlength ng-touched"
name="name" id="name" placeholder="Name" ng-model="jediCtrl.jedi.name"
ng-maxlength="20" />
```

[Documentation AngularJS
(ngMaxlength)](https://docs.angularjs.org/api/ng/directive/ngMaxlength)

## required


Invalide le formulaire et le champ si l'input n'est pas saisi. Ce validateur ne peut être utilisé que sur les champs de type input ou select.

```js
<input type="text" class="form-control" name="name" id="name" placeholder="Name"
ng-model="jediCtrl.jedi.name" required />
```

Le non-respect du validateur ajoute la propriété "`required`" à l'objet "\$error" du composant et du formulaire. Ainsi, on peut s'appuyer sur l'existence de cette propriété pour faire apparaître un message d'erreur.

```js
<span class="alert warning" ng-show="jediForm.name.$touched &&
jediForm.name.$error.required">Hey, don't forget to give a name to your jedi!</span>
```

Le non-respect du validateur ajoute les classes CSS "ng-invalid-maxlength" et "ng-invalid" sur le composant et le formulaire

```js
<span class="alert warning" ng-show="jediForm.name.$touched &&
jediForm.name.$error.required">Hey, don't forget to give a name to your jedi!</span>
```

[Documentation AngularJS
(ngRequired)](https://docs.angularjs.org/api/ng/directive/ngRequired)

## ng-pattern


Invalide le formulaire et le champ si le texte saisi dans le champ ne respecte pas l'expression régulière. Ce validateur ne peut être utilisé que sur les champs de texte.

```js
<input type="text" class="form-control" name="name" id="name" placeholder="Name"
ng-model="jediCtrl.jedi.name" ng-pattern="/^.+\s.+$/" />
```

Le non-respect du validateur ajoute la propriété "pattern" à l'objet "\$error" du composant et du formulaire. Ainsi, on peut s'appuyer sur l'existence de cette propriété pour faire apparaître un message d'erreur.

```js
<span class="alert warning" ng-show="jediForm.name.$error.pattern">A Jedi has always a
first name and a last name!</span>
```

Le non-respect du validateur ajoute les classes CSS "ng-invalid-pattern" et "ng-invalid" sur le composant et le formulaire.

```js
<input type="text" class="form-control ng-invalid ng-invalid-pattern ng-touched"
name="name" id="name" placeholder="Name" ng-model="jediCtrl.jedi.name"
ng-pattern="/^.+\s.+$/" />
```

[Documentation AngularJS
(ngPattern)](https://docs.angularjs.org/api/ng/directive/ngPattern)

## input[date]


Les champs de type "date" implémentent un validateur qui vérifie que la date saisie est valide et peut vérifier une date min et une date max.

```js
<input type="date" id="birthday " name="birthday " ng-model="jediCtrl.jedi.birthday "
placeholder="AAAA-MM-JJ" min="1016-04-06" max="1998-05-06" />
```

Le format de saisie doit être une date au format ISO "`YYYY-MM-DD`"

Le non-respect du format de la date ajoute la propriété "date" à l'objet "\$error" du composant et du formulaire. Ainsi, on peut s'appuyer sur l'existence de cette propriété pour faire apparaître un message d'erreur.

```js
<span class="alert error" ng-show="jediForm.birthday.$error.date">This date is not
valid!</span>
```

Le non-respect de la date minimum ajoute la propriété "min" à l'objet "\$error" du composant et du formulaire.

```js
<span class="alert error" ng-show="jediForm.birthday.$error.min">This Jedi is too
old!</span>
```

Le non-respect de la date maximum ajoute la propriété "max" à l'objet "\$error" du composant et du formulaire.

```js
<span class="alert error" ng-show="jediForm.birthday.$error.max">This padawan is too
young!</span>
```

Le non-respect du validateur ajoutes les classes CSS "ng-invalid-date", "ng-invalid-min", "ng-invalid-max" et "ng-invalid" en fonction de la règle non respectée.

[Documentation AngularJS
(input[date])](https://docs.angularjs.org/api/ng/input/input%5Bdate%5D)

## input[email]

Les champs de type "email" implémentent un validateur qui vérifie que le texte saisie est conforme au format d'une adresse e-mail. Il s'agit uniquement d'un contrôle de surface basé sur l'expression régulière de Chromium.

```js
<input type="email" id="mail" name="mail" ng-model="jediCtrl.jedi.mail"
placeholder="jedi@laforce.fr" />
```

Le non-respect du validateur ajoute la propriété "email" à l'objet "\$error" du composant et du formulaire. Ainsi, on peut s'appuyer sur l'existence de cette propriété pour faire apparaître un message d'erreur.

```js
<span class="alert warning" ng-show="jediForm.mail.$error.email">E-mail address is not
valid!</span>
```

Le non-respect du validateur ajoute les classes CSS "ng-invalid-email" et "ng-invalid" sur le composant et le formulaire.

```js
<input type="email" class="form-control ng-invalid ng-invalid-email ng-touched"
name="mail" id="mail" ng-model="jediCtrl.jedi.mail" placeholder="jedi@laforce.fr" />
```

Documentation AngularJS (input[email])

## input[number]

Les champs de type "number" implémentent un validateur qui vérifie que le texte saisie est un nombre. La propriété du modèle associée doit être un nombre sinon AngularJS lève une exception.

```js
<input type="number" id="size" name="size" ng-model="jediCtrl.jedi.size"
placeholder="size" />
```

Le non-respect du validateur ajoute la propriété "number" à l'objet "\$error" du composant et du formulaire. Ainsi, on peut s'appuyer sur l'existence de cette propriété pour faire apparaître un message d'erreur.

```js
<span class="alert warning" ng-show="jediForm.mail.$error.number">This is not a valid
size!</span>
```

Comme pour le type "date", il est possible d'utiliser les attributs "min" et "max"  sur ce composant.

Le non-respect du validateur ajoute les classes CSS "ng-invalid-number" et "ng-invalid" sur le composant et le formulaire.

```js
<input type="number" class="form-control ng-invalid ng-invalid-number ng-touched"
name="size" id="size" ng-model="jediCtrl.jedi.size" placeholder="size" />
```

Documentation AngularJS (input[number])

## Désactivation du bouton "Submit"

Lorsque le formulaire n'est pas valide, il peut être intéressant d’empêcher l'utilisateur de valider sa saisie.

Pour ce faire il suffit d'utiliser la directive "ng-disabled" sur le bouton.

```js
<button
 type="submit"
 class="btn btn-primary"
 ng-disabled="!jediForm.$dirty || jediForm.$invalid"
>Create</button>
```

Ici, on désactive le bouton "submit" si le formulaire n'a pas été saisi ou s'il est invalide.
