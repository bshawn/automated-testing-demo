# Look Ma', No Hands

## TOC

- [Demo 1](#Demo-1)
- [Demo 2](#Demo-2)
- [Demo 3](#Demo-3)
- [Demo 4](#Demo-4)

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

- Create a new `conf.js` and `spec.js`
-
