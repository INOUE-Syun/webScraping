const webdriver = require('selenium-webdriver');

const By = webdriver.By;
const until = webdriver.until;

// 通常はこれで
// const driver = new webdriver.Builder()
//   .withCapabilities(webdriver.Capabilities.chrome()).build();

// ヘッドレスでテストしたい場合は、`headless`オプションが必要
// かつ、chromeの場合はヘッドレスモード搭載バージョン(59)以上が必要で、更に現時点では実行ファイル指定が必要。
const chromeCapabilities = webdriver.Capabilities.chrome();
const chromeOptions = {
  args: ['headless'],
  binary: 'C:\\Users\\lisa49\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe',
};
chromeCapabilities.set('chromeOptions', chromeOptions);
const driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();

// GoogleTrends
driver.get('https://trends.google.co.jp/trends/');

// 今人気の話題
const waittimeMsec = 2000;
driver.wait(until.elementLocated(By.tagName('md-list-item')), waittimeMsec)
  .then(() => {
    // `home-no-featured`
    driver.findElement(By.id('home-no-featured')).getText()
      .then(text => console.log(`<<${text}>>`));
    // `md-list-item`
    driver.findElements(By.tagName('md-list-item'))
      .then((elements) => {
        // トレンドの文言を取得
        elements.map((element) => {
          element.findElement(By.tagName('span')).getText()
            .then(text => console.log(text));
        });
      });
  })
  .then(() => {
    // ドライバ開放
    driver.quit();
  });
