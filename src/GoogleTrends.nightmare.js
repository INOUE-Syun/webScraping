const Nightmare = require('nightmare');

// ブラウザを起動するモード
const nightmare = Nightmare({ show: false });

// Googleトレンドから急上昇ワードをスクレイピングする
nightmare
  // 飛んで
  .goto('https://trends.google.co.jp/trends/')
  // 生成を待って
  .wait('md-list-item')
  // トレンドを取得する
  .evaluate(() => {
    const listItem = document.querySelectorAll('md-list-item');
    // スマンな、Node v6.9.3だと`Object.values`をサポートしていないんだ。
    return Object.keys(listItem)
      .map(key => listItem[key].querySelector('span').innerText);
  })
  // 開放
  .end()
  // トレンドを出力
  .then((trends) => {
    // console.log(trends);
    trends.map(trend => console.log(trend));
  });
