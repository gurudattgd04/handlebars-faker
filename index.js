var faker = require('faker');
var assert = require('assert');
var defaultLanguage = 'en';

module.exports = function handlebarsFakerHelper (fakeName /*, [...], options */) {
  assert(typeof fakeName === 'string', 'fakeName is required: e.g. {{faker "internet.email"}}');
  var fakeNameParts = fakeName.split('.');
  assert(fakeNameParts.length === 2 && faker[fakeNameParts[0]] && faker[fakeNameParts[0]][fakeNameParts[1]],
    'fake "' + fakeName + '" not found. For a full list of all available fakes see https://github.com/marak/Faker.js/');

  var fakeFunction = faker[fakeNameParts[0]][fakeNameParts[1]];
  var options = arguments[arguments.length - 1];
  var fakerArguments = Array.prototype.slice.call(arguments, 1, arguments.length - 1);
  var language = options.hash.lang || defaultLanguage;
  var fakerLanguage = faker.locale;
  faker.locale = language;
  var result = fakeFunction.apply(faker, fakerArguments);
  faker.locale = fakerLanguage;
  return result;
};

module.exports.setDefaultLanguage = function (language) {
  defaultLanguage = language;
};