const EC = protractor.ExpectedConditions;
const timeout = 5000;

function isClickable(element) {
  return EC.elementToBeClickable(element, timeout);
}

function waitUntilClickable(element) {
  return browser.wait(isClickable(element));
}

module.exports = {
  isClickable,
  waitUntilClickable
};
