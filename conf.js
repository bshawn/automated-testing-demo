// conf.js
exports.config = {
  framework: "jasmine",
  seleniumAddress: "http://localhost:4444/wd/hub",
  specs: ["spec.js"],
  capabilities: {
    browserName: "chrome"
  },
  onPrepare: function() {
    browser.ignoreSynchronization = true;
  }
};
