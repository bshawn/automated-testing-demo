describe("conduit login", () => {
  const EC = protractor.ExpectedConditions;
  const timeout = 10000;
  const email = "bdstest@hotmail.com";
  const userName = "bdstest2";
  const password = "123Test!";

  beforeAll(() => {
    browser.ignoreSynchronization = true;
  });

  beforeEach(() => {
    return browser.get("https://react-redux.realworld.io/");
  });

  it("should log the user into the app", () => {
    const loginLink = element(by.css(".nav-link[href='#login']"));
    const loginIsClickable = EC.elementToBeClickable(loginLink, timeout);
    const emailInput = element(by.css("input[type='email']"));
    const emailIsClickable = EC.elementToBeClickable(emailInput, timeout);
    const passwordInput = element(by.css("input[type='password']"));
    const passwordIsClickable = EC.elementToBeClickable(passwordInput, timeout);
    const signInButton = element(by.css("button[type='submit']"));
    const signInIsClickable = EC.elementToBeClickable(signInButton, timeout);
    const userNameHeader = element(by.linkText(userName));
    const headerIsClickable = EC.elementToBeClickable(userNameHeader, timeout);

    return Promise.resolve(() => {
      return browser.wait(loginIsClickable);
    })
      .then(() => {
        return loginLink.click();
      })
      .then(() => {
        return browser.wait(emailIsClickable);
      })
      .then(() => {
        return emailInput.click();
      })
      .then(() => {
        return emailInput.sendKeys(email);
      })
      .then(() => {
        return browser.wait(passwordIsClickable);
      })
      .then(() => {
        return passwordInput.click();
      })
      .then(() => {
        return passwordInput.sendKeys(password);
      })
      .then(() => {
        return browser.wait(signInIsClickable);
      })
      .then(() => {
        return signInButton.click();
      })
      .then(() => {
        return browser.wait(headerIsClickable);
      })
      .then(() => {
        var actual = headerIsClickable();
        return expect(actual).toBe(true);
      });
  });
});
