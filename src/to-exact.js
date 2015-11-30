var isStrict = require('./is-strict-semver');

// code duplication against
// https://github.com/bahmutov/grunt-nice-package/blob/master/tasks/nice_package.js
function removeFuzziness(version) {
  return version
    .replace('^', '')
    .replace('~', '');
}

function removeLeadingV(version) {
  return version.replace(/^v/, '');
}

function toExact(name, version, fallback) {
  if (arguments.length === 1) {
    version = name;
    name = 'unknown';
  }
  var cleaned = removeLeadingV(removeFuzziness(version));
  if (!isStrict(cleaned)) {
    // TODO use fallback function
    /* eslint no-console:0 */
    console.error('could not clean up %s version %s', name, cleaned);
    return version;
  }
  return cleaned;
}

module.exports = toExact;
