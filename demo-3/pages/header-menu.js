const helpers = require("../helpers");

const elements = {
  loginLink: element(by.css(".nav-link[href='#login']")),
  userNameLink: userName => element(by.linkText(userName))
};

async function waitUntilReady() {
  await helpers.waitUntilClickable(elements.loginLink);
}

async function clickLogIn() {
  await elements.loginLink.click();
}

function waitUntilUserNameIsClickable(userName) {
  return helpers.waitUntilClickable(elements.userNameLink(userName));
}

async function isUserNameClickable(userName) {
  try {
    await helpers.isClickable(elements.userNameLink(userName));
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  waitUntilReady,
  clickLogIn,
  waitUntilUserNameIsClickable,
  isUserNameClickable
};
