# Look Ma', No Hands

## TOC

- [Demo 1](#Demo-1)
- [Demo 2](#Demo-2)
- [Demo 3](#Demo-3)

## Script

### Demo 1

Basic 'Hello World' demo (straight off of the Protractor site)

- Open a console

```bash
npm install -g protractor
webdriver-manager update
webdriver-manager start
```

#### Test

[http://localhost:4444/wd/hub](http://localhost:4444/wd/hub)

#### Code Steps

```bash
mkdir demo-1
cd ./demo-1
code .
```

- Create a new file in the root called `todo-spec.js`

  ```js
  // todo-spec.js
  describe("angularjs homepage todo list", function() {
    it("should add a todo", function() {
      browser.get("https://angularjs.org");

      element(by.model("todoList.todoText")).sendKeys(
        "write first protractor test"
      );
      element(by.css('[value="add"]')).click();

      var todoList = element.all(by.repeater("todo in todoList.todos"));
      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual("write first protractor test");

      // You wrote your first test, cross it off the list
      todoList
        .get(2)
        .element(by.css("input"))
        .click();
      var completedAmount = element.all(by.css(".done-true"));
      expect(completedAmount.count()).toEqual(2);
    });
  });
  ```

- Create a new file in the root called `conf.js`

  ```js
  // conf.js
  exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    specs: ["todo-spec.js"]
  };
  ```

- Add `browser.sleep(5000)` to `todo-spec.js`
- Update conf.js to target Firefox

  ```js
  // conf.js
  exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    specs: ["todo-spec.js"],
    capabilities: {
      browserName: "firefox"
    }
  };
  ```

- Update conf.js to target both Chrome AND Firefox

  ```js
  // conf.js
  exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    specs: ["todo-spec.js"],
    multiCapabilities: [
      {
        browserName: "firefox"
      },
      {
        browserName: "chrome"
      }
    ]
  };
  ```

### Demo 2

```bash
cd ..
mkdir demo-2
cd ./demo-2
code .
```

- Ignore synchronization (non-Angular apps)

  ```js
  browser.ignoreSynchronization = true;
  ```

- Create a new `conf.js` and `conduit-spec.js`

  ```js
  // conf.js
  exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    specs: ["conduit-spec.js"],
    capabilities: {
      browserName: "firefox"
    }
  };
  ```

  ```js
  // conduit-spec.js
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
      const passwordIsClickable = EC.elementToBeClickable(
        passwordInput,
        timeout
      );
      const signInButton = element(by.css("button[type='submit']"));
      const signInIsClickable = EC.elementToBeClickable(signInButton, timeout);
      const userNameHeader = element(by.linkText(userName));
      const headerIsClickable = EC.elementToBeClickable(
        userNameHeader,
        timeout
      );

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
  ```

- rewrite `conduit-spec.js` to use async/await

  ```js
  // conduit-spec.js
  describe("conduit login", () => {
    const EC = protractor.ExpectedConditions;
    const timeout = 10000;
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
      const loginLink = element(by.css(".nav-link[href='#login']"));
      const loginIsClickable = EC.elementToBeClickable(loginLink, timeout);
      await browser.wait(loginIsClickable);
      await loginLink.click();

      const emailInput = element(by.css("input[type='email']"));
      const emailIsClickable = EC.elementToBeClickable(emailInput, timeout);
      await browser.wait(emailIsClickable);
      await emailInput.click();
      await emailInput.sendKeys(email);

      const passwordInput = element(by.css("input[type='password']"));
      const passwordIsClickable = EC.elementToBeClickable(
        passwordInput,
        timeout
      );
      await browser.wait(passwordIsClickable);
      await passwordInput.click();
      await passwordInput.sendKeys(password);

      const signInButton = element(by.css("button[type='submit']"));
      const signInIsClickable = EC.elementToBeClickable(signInButton, timeout);
      await browser.wait(signInIsClickable);
      await signInButton.click();

      const userNameHeader = element(by.linkText(userName));
      const headerIsClickable = EC.elementToBeClickable(
        userNameHeader,
        timeout
      );
      await browser.wait(headerIsClickable);

      var actual = headerIsClickable();
      expect(actual).toBe(true);
    });
  });
  ```

### Demo 3

```bash
cd ..
mkdir demo-3
cd ./demo-3
code .
```

- Create a new `conf.js`, `conduit-spec.js`

  ```js
  // conf.js
  exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    specs: ["conduit-spec.js"],
    capabilities: {
      browserName: "chrome"
    }
  };
  ```

  ```js
  // conduit-spec.js
  describe("conduit login", () => {
    const EC = protractor.ExpectedConditions;
    const timeout = 10000;
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
      const loginLink = element(by.css(".nav-link[href='#login']"));
      const loginIsClickable = EC.elementToBeClickable(loginLink, timeout);
      await browser.wait(loginIsClickable);
      await loginLink.click();

      const emailInput = element(by.css("input[type='email']"));
      const emailIsClickable = EC.elementToBeClickable(emailInput, timeout);
      await browser.wait(emailIsClickable);
      await emailInput.click();
      await emailInput.sendKeys(email);

      const passwordInput = element(by.css("input[type='password']"));
      const passwordIsClickable = EC.elementToBeClickable(
        passwordInput,
        timeout
      );
      await browser.wait(passwordIsClickable);
      await passwordInput.click();
      await passwordInput.sendKeys(password);

      const signInButton = element(by.css("button[type='submit']"));
      const signInIsClickable = EC.elementToBeClickable(signInButton, timeout);
      await browser.wait(signInIsClickable);
      await signInButton.click();

      const userNameHeader = element(by.linkText(userName));
      const headerIsClickable = EC.elementToBeClickable(
        userNameHeader,
        timeout
      );
      await browser.wait(headerIsClickable);

      var actual = headerIsClickable();
      expect(actual).toBe(true);
    });
  });
  ```

- Create `helper.js` and create `isClickable(element)` and `waitUntilClickable(element)`

  ```js
  // helper.js
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
  ```

- Create `pages/header-menu.js`

  ```js
  // header-menu.js
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
  ```

- Create `login-page.js`

  ```js
  // login-page.js
  const helpers = require("../helpers");

  const elements = {
    emailInput: element(by.css("input[type='email']")),
    passwordInput: element(by.css("input[type='password']")),
    signInButton: element(by.css("button[type='submit']"))
  };

  async function waitUntilReady() {
    await helpers.waitUntilClickable(elements.emailInput);
  }

  async function logIn(email, password) {
    await waitUntilReady();
    await elements.emailInput.click();
    await elements.emailInput.sendKeys(email);
    await elements.passwordInput.sendKeys(password);
    await elements.signInButton.click();
  }

  module.exports = {
    waitUntilReady,
    logIn
  };
  ```

- Rewrite `conduit-spec.js`

  ```js
  // conduit-spec.js
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
  ```
