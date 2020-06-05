const util = window.util;
const cheerio = require("cheerio");

class BapeJP {
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

    host = 'https://bape.com';
    // 次回、ヘッダーの定義が多すぎるので一つにオブジェクトを定義して(postHeaders)それを書き換える
    // 初回ログイン　これは購入前に実行する必要があります。

    url = 'https://bape.com/login/index.php?dir=Li4lMkZteXBhZ2UlMkY=';
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
    params = new URLSearchParams('additemid=&radiog_dark=&itemurl=&login_id=&login_checkbox=1&password=&re_dir=Li4lMkZteXBhZ2UlMkY%3D');
    params.set('login_id', this.taskData['accounts'][0]['user']);
    params.set('password', this.taskData['accounts'][0]['password']);
    postData = params.toString();

    url = 'https://bape.com/login/';
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

    host = 'https://bape.com';
    // NIKE AIR MAX 90 CARGO KHAKI/CARGO KHAKI-UNIVERSITY RED 19HO-S
    url = 'https://bape.com/webstore/itemdetail.php?brandid=Mg==&new=&categoryid=MjM=&itemid=&stock=MQ==&stock=MQ==&name=MUY4MC0xMTAtMDcz';
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

    params = new URLSearchParams('action=add&fav_price=OCUyQzgwMA%3D%3D&radiog_dark99=S&radiog_dark=M');
    params.set('fav_price', $('[name="fav_price"]').val());
    params.set('radiog_dark', 'M');
    postData = params.toString();

    postHeaders['Referer'] = url;

    url = 'https://bape.com/webstore/itemdetail.php?action=add&brandid=Mg==&categoryid=MjM=&price=&stock=MQ==&itemid=&color=';
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

    delete postHeaders['Referer'];

    console.log(res.headers);
    this.dataStore['cookie'] = cookie;

    return res.body;
  }

  // 購入する
  async buy() {
    let url, ck, cookie, getHeaders, postHeaders, params, postData, formData, res, $ = null, host;

    const str2doc = str => {
      let parser = new DOMParser();
      return parser.parseFromString(str, "text/html");
    };

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

    host = 'https://bape.com';

    url = 'https://bape.com/cart/';
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

    formData = new FormData(str2doc(res.body).querySelector('#confirm_card_form'));
    params = new URLSearchParams('add_value=&del_value=&pre_order=0');
    for(let k of formData.keys()) {
      if(params.get(k) === null) {
        params.set(k, formData.get(k));
      }
    }
    postData = params.toString();

    console.log(postData);

    postHeaders['Referer'] = url;
    url = 'https://bape.com/cart/shipping.php';
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

    console.log(res.body);
    
    $ = cheerio.load(res.body);

    formData = new FormData(str2doc(res.body).querySelector('#form_submit'));
    params = new URLSearchParams('pre_order=b3JlZGVy&user_address=0&zipcode01=100&zipcode02=0000&zip=100-0000&prefecture=%E6%9D%B1%E4%BA%AC%E9%83%BD&address=%E5%8D%83%E4%BB%A3%E7%94%B0%E5%8C%BA&building=fefe&temp_zip=1000000&temp_prefecture=%E6%9D%B1%E4%BA%AC%E9%83%BD&temp_address=%E5%8D%83%E4%BB%A3%E7%94%B0%E5%8C%BA&temp_building=fefe');
    for(let k of params.keys()) {
      console.log(k, formData.get(k));
      params.set(k, formData.get(k));
    }
    postData = params.toString();

    postHeaders['Referer'] = url;
    url = 'https://bape.com/cart/payment.php';
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

    $ = cheerio.load(res.body);

    formData = new FormData(str2doc(res.body).querySelector('#form_submit'));
    params = new URLSearchParams('token=&pre_order=b3JlZGVy&payment_type=0&card_company=1&card_number_1_sub=&card_number_2_sub=&card_number_3_sub=&card_number_4_sub=&card_number=&card_number_2=&card_name=&card_date_yy=19&card_date_mm=01&card_date=1901&zip=1000000&prefecture=%E6%9D%B1%E4%BA%AC%E9%83%BD&address=%E5%8D%83%E4%BB%A3%E7%94%B0%E5%8C%BA&building=fefe&user_address=0');
    for(let k of params.keys()) {
      params.set(k, formData.get(k));
    }
    postData = params.toString();

    postHeaders['Referer'] = url;
    url = 'https://bape.com/cart/confirm.php';
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
    
    $ = cheerio.load(res.body);

    formData = new FormData(str2doc(res.body).querySelector('#confirm_cart_form'));
    params = new URLSearchParams('pre_order=b3JlZGVy&confirm=confirm&submit_controller=0');
    for(let k of params.keys()) {
      params.set(k, formData.get(k));
    }
    postData = params.toString();

    postHeaders['Referer'] = url;
    url = 'https://bape.com/cart/payment_confirm.php';
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

    this.dataStore['cookie'] = cookie;

    console.log('done', res);
    return res.body;
  }
}
export default BapeJP;
