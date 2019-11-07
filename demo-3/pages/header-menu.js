const helpers = require("../helpers");

const elements = {
  loginLink: $(by.css(".nav-link[href='#login']")),
  userNameLink: userName => $(by.linkText(userName))
};

async function waitUntilReady() {
  await helpers.waitUntilClickable(elements.loginLink);
}

async function clickLogIn() {
  await elements.loginLink.click();
}

async function userNameIsClickable(userName) {
  return helpers.isClickable(userNameLink(userName));
}

module.exports = {
  waitUntilReady,
  clickLogIn,
  userNameIsClickable
};
