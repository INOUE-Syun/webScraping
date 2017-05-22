const Nightmare = require('nightmare');
const vo = require('vo');

/**
 * トレンド(急上昇ワード)を取得する
 * @param {*} nightmare
 */
const doSearch = (nightmare) => {
  return nightmare
    // 目的のURLに飛んで
    .goto('http://www.google.com')
    // 要素が生成されるまで待って
    .wait('#lst-ib')
    // 検索ワードを入力して
    .type('input[name="q"]', 'webdriver')
    // 検索ボタンをクリックして
    .click('input[name="btnK"]')
    // 結果を待って
    .wait('#resultStats')
    // 取り出す
    .evaluate(() => {
      // `div`なので`innerText`で取り出す
      return document.querySelector('#resultStats').innerText;
    });
};

/**
 * メイン
 */
vo(function* () {
  // `show: true`にすると、electronが起動してガチャガチャ動く
  const nightmare = Nightmare({ show: true });
  const trends = yield doSearch(nightmare);
  yield nightmare.end();
  return trends;
})((err, result) => {
  if (err) return console.log(err);
  return console.log(result);
});
