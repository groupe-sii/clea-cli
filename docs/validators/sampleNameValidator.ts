import 'angular';
import IPromise = angular.IPromise;

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

/**
 * Interface to custom the default Validator
 * Add the method 'nameNotUsed'
 */
export interface SampleModelValidatorsInterface extends ng.IModelValidators {
    /**
     * @method nameNotUsed Method to check if the name type in the current web control is not used
     * @param modelValue any Value of the model property
     * @param viewValue any Value of the current web control
     * @return isValid boolean True if the name is not used
     */
    nameNotUsed: (modelValue:any, viewValue:any) => boolean;
}

/**
 * Interface to custom the default model
 * Set the default validator's type to ITestModelValidators
 */
export interface SampleModelInterface extends ng.INgModelController {
    $validators: SampleModelValidatorsInterface;
}

/**
 * Sample Name Validator. Check if the text type in the current web control is not used
 */
export class SampleNameValidator implements ng.IDirective {
    'use strict';

    public restrict = 'A';
    public require = 'ngModel';
    public scope = {namesCollection: '=names'};
    public static $inject = [];

    /**
     * Regex to replace any character that is not a letter or a digit
     * @type {RegExp}
     */
    public static regex:RegExp = /[\W_]/gi;

    /**
     * Check if the name type in the current web control is not used
     * @param scope ITestScope Scope of the validator
     * @param viewValue any Value of the textbox
     * @return isValid boolean True if the name is not used
     */
    public static nameNotUsed:Function = (scope:SampleScopeInterface, viewValue:any):boolean => (
    !scope.namesCollection ||
    scope.namesCollection.length === 0 ||
    scope.namesCollection.map(
        name => name.toUpperCase().replace(SampleNameValidator.regex, '')
    ).indexOf(viewValue.toUpperCase().replace(SampleNameValidator.regex, '')) === -1);

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
}


export default angular
    .module('sii.sample', [])
    .directive('sampleNameValidator', SampleNameValidator.Factory())
    .name;
