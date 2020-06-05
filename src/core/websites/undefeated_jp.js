const util = window.util;
const cheerio = require("cheerio");

class UndefeatedJP {
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

    host = 'https://www.makeshop.jp';
    // 次回、ヘッダーの定義が多すぎるので一つにオブジェクトを定義して(postHeaders)それを書き換える
    // 初回ログイン　これは購入前に実行する必要があります。

    /*
    url = 'https://www.makeshop.jp/ssl/slogin/?_ga=2.218363353.1795128776.1576132640-1665801876.1563583693';
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
    */

    params = new URLSearchParams('type=member&code=&brandcode=&ssl_login_return_url=%252Findex.html%253F_ga%253D2.218363353.1795128776.1576132640-1665801876.1563583693&is_newpage_ip_limit=&sub_type=&opt=&amazon_login_type=&amazon_linked_shop_user_id=&id=&passwd=&auto_login=on');
    params.set('id', this.taskData['accounts'][0]['user']);
    params.set('passwd', this.taskData['accounts'][0]['password']);
    postData = params.toString();

    url = 'https://www.makeshop.jp/ssl/?ssltype=member&db=undefeated';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    postHeaders['Referer'] = 'https://www.makeshop.jp/ssl/slogin/?_ga=2.218363353.1795128776.1576132640-1665801876.1563583693';
    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    $ = cheerio.load(res.body);

    url = $('[HTTP-EQUIV="REFRESH"]').attr('content').replace('10; URL=', '');
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

    host = 'https://www.billys-tokyo.net';
    // NIKE AIR MAX TAILWIND 99 SP - BLACK
    url = 'https://undefeated.jp/shopdetail/000000008011/01_00_02/page1/recommend/';
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
export default UndefeatedJP;
