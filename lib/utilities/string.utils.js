const slug = require('slugify');

class StringUtils {

  /**
   * Returns the lowerCamelCase form of a string.
   *
   * ```javascript
   * camelize('innerHTML');          // 'innerHTML'
   * camelize('action_name');        // 'actionName'
   * camelize('css-class-name');     // 'cssClassName'
   * camelize('my favorite items');  // 'myFavoriteItems'
   * camelize('My Favorite Items');  // 'myFavoriteItems'
   * ```
   *
   * @param   {string}  str       The string to camelize
   * @param   {boolean} slugify   Slugify the output ?
   * @return  {string}            The camelized string
   */
  static camelize (str, slugify = false) {
    str = str.replace(StringUtils.STRING_CAMELIZE_REGEXP, (match, separator, chr) => {
      return chr ? chr.toUpperCase() : '';
    }).replace(/^([A-Z])/, (match) => {
      return match.toLowerCase();
    });

    return (slugify) ? slug(str) : str;
  }

  /**
   * Converts a camelized string into all lower case separated by underscores.
   *
   * ```javascript
   * decamelize('innerHTML');         // 'inner_html'
   * decamelize('action_name');       // 'action_name'
   * decamelize('css-class-name');    // 'css-class-name'
   * decamelize('my favorite items'); // 'my favorite items'
   * ```
   *
   * @param   {string} str  The string to decamelize
   * @return  {string}      The decamelized string
   */
  static decamelize (str) {
    return str.replace(StringUtils.STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
  }

  /**
   * Replaces underscores, spaces, or camelCase with dashes.
   *
   * ```javascript
   * dasherize('innerHTML');         // 'inner-html'
   * dasherize('action_name');       // 'action-name'
   * dasherize('css-class-name');    // 'css-class-name'
   * dasherize('my favorite items'); // 'my-favorite-items'
   * ```
   *
   * @param   {string}  str       The string to dasherize
   * @param   {boolean} slugify   Slugify the output ?
   * @return  {string}            The dasherized string
   */
  static dasherize (str, slugify = false) {
    str = StringUtils.decamelize(str).replace(StringUtils.STRING_DASHERIZE_REGEXP, '-');

    return (slugify) ? slug(str, '-') : str;
  }

  /**
   * Returns the UpperCamelCase form of a string.
   *
   * ```javascript
   * classify('innerHTML');          // 'InnerHTML'
   * classify('action_name');        // 'ActionName'
   * classify('css-class-name');     // 'CssClassName'
   * classify('my favorite items');  // 'MyFavoriteItems'
   * ```
   *
   * @param   {string} str  The string to classify
   * @return  {string}      The classified string
   */
  static classify (str) {
    let parts = str.split('.'),
      out = [];

    for (let i = 0, l = parts.length; i < l; i++) {
      let camelized = StringUtils.camelize(parts[i]);

      out.push(camelized.charAt(0).toUpperCase() + camelized.substr(1));
    }

    return out.join('.');
  }
}

StringUtils.STRING_CAMELIZE_REGEXP = (/(-|_|\.|\s)+(.)?/g);
StringUtils.STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);
StringUtils.STRING_DASHERIZE_REGEXP = (/[ _]/g);

module.exports = StringUtils;
