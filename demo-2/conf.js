exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  specs: ["conduit-spec.js"],
  capabilities: {
    browserName: "firefox"
  }
};
