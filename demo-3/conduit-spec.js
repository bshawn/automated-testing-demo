const loginPage = require("./pages/login-page");
const headerMenu = require("./pages/header-menu");

describe("conduit login", () => {
  const email = "bdstest@hotmail.com";
  const userName = "bdstest2";
  const password = "123Test!";

  beforeAll(() => {
    browser.ignoreSynchronization = true;
  });

  beforeEach(async () => {
    await browser.get("https://react-redux.realworld.io/");
  });

  it("should log the user into the app", async () => {
    await headerMenu.waitUntilReady();
    await headerMenu.clickLogIn();
    await loginPage.waitUntilReady();
    await loginPage.logIn(email, password);
    await headerMenu.waitUntilUserNameIsClickable(userName);
    var actual = await headerMenu.isUserNameClickable(userName);
    expect(actual).toBe(true);
  });
});
