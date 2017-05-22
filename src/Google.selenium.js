const webdriver = require('selenium-webdriver');

const By = webdriver.By;

// chromeで起動
const driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  // .withCapabilities(webdriver.Capabilities.ie())
  // .withCapabilities(webdriver.Capabilities.opera())
  // .withCapabilities(webdriver.Capabilities.firefox())
  .build();

const $ = driver.findElement.bind(driver);

// Google
driver.get('http://www.google.com');

// 検索ボックスに`webdriver`と入力
$(By.name('q')).sendKeys('webdriver');

// 検索ボタンを押す
$(By.name('btnK')).click();

// ヒット数が表示されるまで待つ
const timeoutMSec = 2000;
driver.wait(webdriver.until.elementLocated(By.id('resultStats')), timeoutMSec)
  .then(() => {
    $(By.id('resultStats')).getText()
      .then((text) => {
        console.log(text);
      });
  })
  .then(() => {
    driver.quit();
  });
