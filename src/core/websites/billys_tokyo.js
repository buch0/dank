const util = window.util;
const cheerio = require("cheerio");

class BillysTokyo {
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

    host = 'https://www.billys-tokyo.net';
    // 次回、ヘッダーの定義が多すぎるので一つにオブジェクトを定義して(postHeaders)それを書き換える
    // 初回ログイン　これは購入前に実行する必要があります。

    url = 'https://www.billys-tokyo.net/shop/customer/menu.aspx';
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
    params = new URLSearchParams('uid=&pwd=&order.x=0&order.y=0');
    params.set('uid', this.taskData['accounts'][0]['user']);
    params.set('pwd', this.taskData['accounts'][0]['password']);
    postData = params.toString();

    url = 'https://www.billys-tokyo.net/shop/customer/menu.aspx';
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

    getHeaders['Cookie'] = cookie;
    url = res.headers['location'];

    while(true) {
      this.log(url, 'redirection');
      res = await this.redirect(res, getHeaders, host);
      ck = util.updateCookieStore(ck, cookie, res);
      cookie = ck.getAll();
      getHeaders['Cookie'] = cookie;

      if(res.headers['location'] === undefined) {
        break;
      } else {
        url = res.headers['location'];
      }
    }

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

    host = 'https://www.billys-tokyo.net';
    // NIKE AIR MAX 90 CARGO KHAKI/CARGO KHAKI-UNIVERSITY RED 19HO-S
    url = 'https://www.billys-tokyo.net/shop/g/g5904880008045/';
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

    params = new URLSearchParams('goods=5904880008045&x=152&y=3');
    postData = params.toString();

    url = 'https://www.billys-tokyo.net/shop/cart/cart.aspx';
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

    console.log(res.body.includes('BLACK-BRT CRIMSON 23.0CM'));
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

    host = 'https://www.billys-tokyo.net';

    url = 'https://www.billys-tokyo.net/shop/cart/cart.aspx';
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

    params = new URLSearchParams('refresh=true&rowcart1=&rowgoods1=&qty1=1&submit.x=106&submit.y=19');
    params.set('rowcart1', $('[name="rowcart1"]').val());
    params.set('rowgoods1', $('[name="rowgoods1"]').val());
    postData = params.toString();

    url = 'https://www.billys-tokyo.net/shop/cart/cart.aspx';
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

    getHeaders['Cookie'] = cookie;
    url = res.headers['location'];

    while(true) {
      this.log(url, 'redirection');
      res = await this.redirect(res, getHeaders, host);
      ck = util.updateCookieStore(ck, cookie, res);
      cookie = ck.getAll();
      getHeaders['Cookie'] = cookie;

      if(res.headers['location'] === undefined) {
        break;
      } else {
        url = res.headers['location'];
      }
    }

    $ = cheerio.load(res.body);

    params = new URLSearchParams('mode=&dest=0&rowgoods1=&qty1=1&refresh=true&method=2&submit.x=64&submit.y=7');
    params.set('rowgoods1', $('[name="rowgoods1"]').val());
    postData = params.toString();

    url = 'https://www.billys-tokyo.net/shop/order/method.aspx';
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

    getHeaders['Cookie'] = cookie;
    url = res.headers['location'];

    while(true) {
      this.log(url, 'redirection');
      res = await this.redirect(res, getHeaders, host);
      ck = util.updateCookieStore(ck, cookie, res);
      cookie = ck.getAll();
      getHeaders['Cookie'] = cookie;

      if(res.headers['location'] === undefined) {
        break;
      } else {
        url = res.headers['location'];
      }
    }

    $ = cheerio.load(res.body);

    params = new URLSearchParams('estimate=&comment=&crsirefo_hidden=&submit.x=97&submit.y=15');
    params.set('estimate', $('[name="estimate"]').val());
    params.set('crsirefo_hidden', $('[name="crsirefo_hidden"]').val());
    postData = params.toString();

    
    url = 'https://www.billys-tokyo.net/shop/order/estimate.aspx';
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

    getHeaders['Cookie'] = cookie;
    url = res.headers['location'];

    this.log(res.headers, res.body);
    while(true) {
      this.log(url, 'redirection');
      res = await this.redirect(res, getHeaders, host);
      ck = util.updateCookieStore(ck, cookie, res);
      cookie = ck.getAll();
      getHeaders['Cookie'] = cookie;

      if(res.headers['location'] === undefined) {
        break;
      } else {
        url = res.headers['location'];
      }
    }

    $ = cheerio.load(res.body);

    this.dataStore['cookie'] = cookie;

    return res.body;
  }
}
export default BillysTokyo;
