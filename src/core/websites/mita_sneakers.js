const util = window.util;
const cheerio = require("cheerio");

class MitaSneakers {
  constructor(taskData) {
    this.taskData = taskData;
    this.dataStore = {
      cookie: '',
      vars: {

      },
    };
  }

  log(...args) {
    const d = new Date();
    const hh = d.getHours();
    const mm = d.getMinutes();
    const ss = d.getSeconds();
    const dd = d.getMilliseconds();

    const fmtd = ('00' + hh).slice(-2) + ":" + ('00' + mm).slice(-2) + ":" + ('00' + ss).slice(-2) + ":" + ('000' + dd).slice(-3);
    
    args.push(fmtd);
    console.log.apply(this, args);
  }
  async redirect(response_, headers_, host) {
    if(response_.headers['location'] === undefined)
      return response_;
    
    let location = response_.headers['location'];
    if(host !== undefined && !location.includes(host)) {
      response_.headers['location'] = host + location;
    }

    var response = await util.request({
      url: response_.headers['location'],
      method: 'GET',
      headers: headers_,
      data: '',
    }, 'utf-8');

    return response;
  }

  // ログイン
  async login() {
    let url, ck, cookie, getHeaders, postHeaders, multiPostHeaders, params, postData, res, $ = null, host;

    ck = util.createCookieStore();
    cookie =  ''; 

    getHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    postHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Content-Length': '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    multiPostHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Content-Length': '',
      'Content-Type': 'multipart/form-data',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    host = 'https://www.mita-sneakers.co.jp';
    // 次回、ヘッダーの定義が多すぎるので一つにオブジェクトを定義して(postHeaders)それを書き換える
    // 初回ログイン　これは購入前に実行する必要があります。

    url = 'https://www.mita-sneakers.co.jp/login.html';
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    $ = cheerio.load(res.body);
    params = new URLSearchParams('pd%5Bid%5D=abc%40suddenattack.ga&pd%5Bpass%5D=saruma123&x=0&y=0');
    params.set('pd[id]', this.taskData['accounts'][0]['user']);
    params.set('pd[pass]', this.taskData['accounts'][0]['password']);
    postData = params.toString();

    url = 'https://www.mita-sneakers.co.jp/login/confirm.html';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    console.log(res.headers, res.body, cookie);

    this.dataStore['cookie'] = cookie;

    return cookie;
  }

  // カートイン
  async cartIn() {
    let url, ck, cookie, getHeaders, postHeaders, params, postData, res, $ = null, host;

    ck = util.createCookieStore();
    cookie =  this.dataStore['cookie']; 

    getHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    postHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Content-Length': '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    this.log('cartIn started');
    host = 'http://www.mita-sneakers.co.jp';
    // "LIMITED EDITION for NSW" ナイキ NIKE AIR MAX PLUS III　BLACK/PIMENTO/BRIGHT CERAMIC/RESIN/WHITE/BLACK
    url = 'http://www.mita-sneakers.co.jp/items/CD7005-001.html';
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    $ = cheerio.load(res.body);

    params = new URLSearchParams('element%5B%5D=size-265&pd%5Bcount%5D=1&master_code=CD7005-001&path=Array&goods_id=178565&x=79&y=13');
    
    // サイズ指定（日本人用） 230cm = 23.0cm, 235cm = 23.5cm
    let skuSize = '27.0cm';
    skuSize = skuSize.replace(/cm/g, ''); // 23

    if(!skuSize.includes('.')) {
      skuSize += '.0'; // 23.0
    }
    skuSize = skuSize.replace(/\./g, ''); // 230

    for(let k of params.keys()) {
      let v = $(`[name="${ k }"]`).val();
      if(v !== undefined) {
        params.set(k, v);
      }
    }
    
    
    params.set('element[]', `size-${skuSize}`);
    postData = params.toString();

    console.log(postData);

    url = 'http://www.mita-sneakers.co.jp/cart/add.html';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    // カートのHTMLが返される
    $ = cheerio.load(res.body);

    this.dataStore['vars']['param_count'] = $('[name*="[count]"]').attr('name');
    this.dataStore['cookie'] = cookie;

    return res.body;
  }

  // 購入する
  async buy() {
    let url, ck, cookie, getHeaders, postHeaders, params, postData, res, $ = null, host;

    ck = util.createCookieStore();
    cookie =  this.dataStore['cookie']; 

    getHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    postHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Content-Length': '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    host = 'http://www.mita-sneakers.co.jp';

    params = new URLSearchParams('order.x=59&order.y=99');
    params.set(this.dataStore['vars']['param_count'], '1'); // 1は数量
    postData = params.toString();

    url = 'http://www.mita-sneakers.co.jp/cart/update.html';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    url = 'https://www.mita-sneakers.co.jp/order.html';
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    postData = '';

    url = 'https://www.mita-sneakers.co.jp/order/orderAjax.html?type=payment&paramval=3';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    postHeaders['Referer'] = 'https://www.mita-sneakers.co.jp/order.html';
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    params = new URLSearchParams('com=&gmoToken=&paymentType=3&CardNo=&cboMM=01&cboYY=19&coupon_cd=&deliveryDay=&deliveryTime=&memo_txt=');
    //params.set... カートが必要な場合はセットする必要がある。
    postData = params.toString();

    url = 'https://www.mita-sneakers.co.jp/order/update.html';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    postHeaders['Referer'] = 'https://www.mita-sneakers.co.jp/order.html';
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    this.dataStore['cookie'] = cookie;

    console.log(res.headers['location']);
    return res.body;
  }
}
export default MitaSneakers;
