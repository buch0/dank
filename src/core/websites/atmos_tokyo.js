const util = window.util;
const cheerio = require("cheerio");

class AtomosTokyo {
  constructor(taskData) {
    this.taskData = taskData;
    this.dataStore = {
      cookie: '',
      res: {},
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
  async redirect(response_, headers_) {
    if(response_.headers['location'] === undefined)
      return response_;

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
    let url, ck, cookie, getHeaders, postHeaders, multiPostHeaders, params, postData, res, $ = null;

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

    // 次回、ヘッダーの定義が多すぎるので一つにオブジェクトを定義して(postHeaders)それを書き換える
    // 初回ログイン　これは購入前に実行する必要があります。

    url = 'https://www.atmos-tokyo.com/customer/menu';
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
    params = new URLSearchParams('_token=&email=&password=&btn_login.x=62&btn_login.y=44');
    params.set('_token', $('[name="_token"]').val());
    params.set('email', this.taskData['accounts'][0]['user']);
    params.set('password', this.taskData['accounts'][0]['password']);
    postData = params.toString();

    url = 'https://www.atmos-tokyo.com/customer/login';
    multiPostHeaders['Cookie'] = cookie; 
    res = await util.request({
        method: 'POST',
        url: url,
        headers: multiPostHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    console.log(res.headers, res.body, cookie);
  
    this.dataStore['cookie'] = cookie;

    getHeaders['Cookie'] = cookie;
    url = res.headers['location'];

    while(true) {
      this.log(url, 'redirection');
      res = await this.redirect(res, getHeaders);
      ck = util.updateCookieStore(ck, cookie, res);
      cookie = ck.getAll();
      getHeaders['Cookie'] = cookie;

      if(res.headers['location'] === undefined) {
        break;
      } else {
        url = res.headers['location'];
      }
    }

    return cookie;
  }

  // カートイン
  async cartIn() {
    let url, ck, cookie, getHeaders, postHeaders, params, postData, res, $ = null;

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

    // NIKE AIR MAX 90 CARGO KHAKI/CARGO KHAKI-UNIVERSITY RED 19HO-S
    url = 'https://www.atmos-tokyo.com/items/cq7512-046';
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

    params = new URLSearchParams('_token=');
    params.set('_token', $('[name="_token"]').val());
    postData = params.toString();

    // サイズ指定（日本人用） 230cm = 23.0cm, 235cm = 23.5cm
    let skuSize = '23cm', itemPath;
    skuSize = skuSize.replace(/cm/g, ''); // 23

    if(!skuSize.includes('.')) {
      skuSize += '.0'; // 23.0
    }
    skuSize = skuSize.replace(/\./g, ''); // 230

    // アイテム追加用のパスを取得
    itemPath = $(`[name*="${ skuSize }cm"]`).val();

    url = 'https://www.atmos-tokyo.com/items/' + itemPath;
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

    return res.body;
  }

  // 購入する
  async buy() {
    let url, ck, cookie, getHeaders, postHeaders, multiPostHeaders, params, postData, res, $ = null;

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

    multiPostHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
      'Content-Length': '',
      'Content-Type': 'multipart/form-data',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Cookie': cookie,
    };

    url = 'https://www.atmos-tokyo.com/order/customer/input';
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
    params = new URLSearchParams('_token=&devicePrint=&userAgent=&addresses=&shipping_date=&shipping_time_id=&coupon_id=&point=&payment_id=&gmopg_token=&cardno=&expire_month=&expire_year=&card_customer_name=&securitycode=&notes=&g-recaptcha-response=');
    params.set('_token', $('[name="_token"]').val());
    params.set('devicePrint', '0400R9HVeoYv1gsNf94lis1zttBaVgjxlOd9HuZZhcaeK4BLIVBmLJ7G94z9MP1SkjRM28MH0uUJuJ4v7HAGOBKdg/HOs+Nkwbln8Efin9D8liyLLJ/akN7kT0nbtw2dg9JBTIBnmyVMxolc1fGwyIjDJnANcjbgcfb2e9b9nhOaWrs7YH5jmdgjJxzTPdvxF02SO0u/WgHoRSClRVCwl39cAos//BPd61qfDe17C32orBF8Ae0mh/OSZsgH1DGeSyhahZfNQgu+lmSl2pKAmu1wluCISazs9PD83/seKcOlvXrGxhKauwqEWLxUN0sYF8r08f8uCcC0xODcb+CqMKE6vbYuKrR0qbarEL8LCxsPh8hMyPpjzYuuV+VhT2JQxvTdTn3ScfrBfYSqDCvq+ZCo7VzIY/MC5B/DPFCFHqaoJFT1cf+8j3C4OLXxUGY26mhoPrEU97k/mPCOh9ltHZfQIojp+SIGs5k/ja5MDk6FaQFHLBYM7bl83r+Nop3TdJMFv9eOvsyvTBVVGK66EXEuaD0YLXuOWeFz6qJENkSK7UHvUSbJ+Ltz3R3+1lLYqHZEazOo5vh7Lvp5huWvTbFjaswUcTeZw8lqKULPxBs5mS/qbqSVzLPeH5WOt9S2UfCfNqioHvhMtd4EMUscz7kbcnG9B+SIx5AnCkrOClWCgeJO4Wi2neb45SVnkIXgJKNLRw6NL2GAwt9rATguwW95O22s0fO33l4+TSvNeefkn5z6DLgVREB6fVwlHiRkw4/Qpi7qciszimb9dBeIcrk/mRYiq8uOwmnSsj69LfM7VRYrI1FeHSbDspvXHhwykQoiuMSNUUyGAvKLg+9aginJmamvnOVDH3SzV6i8/tb5alAK/XRNo3H5dMIK6EAX6criHSUqaz0bJ1o2aVNb3zLi5lU8NguKENqer1nNtP8OECkk/64lKoqM3wDorceNFA82i2sTVjDNkvFE42ys2aVDQcSm+xRvn4mvnxQhLzE/XHOl2pKAmu1wlufgpbZuv5tFTzEBdNLiXsNC09gR/Q8fGeshaHYP8Oq6zOC6i3W35LoOHIZKaayBfZrE0LSmd2/ucx008DNJTl0L8sKJcnm886nAf9/jk5lB7w3+iMdYUky5FHvub+/rvIabWBJyKn+JxTe5Th3oqXvaTAlKPmnZK+Q0rS9ZPiScCwZYdmXt7BEsPiZXdNCqfKAbzwOrtOItTHA2labaL23XIj00GhUM5m8m8kdEsm0uZpQRyqKemuLh5VgYvHz52A5oR/IjU+bZjD2O3xUgB+ZtAeHicfLGEKOaSzC6VU9YFFAN6Q1x80WrOPxkUl4i0L5FdCxEpn3widQ9ylbHrXQdUV78LRUGDZQAjYdtJQT4rdndEntqKBt5s2aZ1VDFwautp5CwJgska0Yy5JnHYpOLzXZ1W5weTMpZsynypOJioV7mnIApWJlcGghPKsB0A6WHY3GTVX/TvfN/wI03wUBk5jqiwN0p0aoMK+r5kKjtXMhj8wLkH8M8UIUepqgkVPVx/7yPcLg4tfFQZjbqaGg+sRT3uT+Y8DHGrQhRFSOhcD6T1dGUjL/6zyI8aBwbfmnswknJZXfyR2b3a7FZfQNQho7BVe8QmcXWFXmQIKiwPdpx1iiZulU=');
    params.set('userAgent', 'mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/78.0.3904.108 safari/537.36');
    params.set('addresses', '0');
    params.set('shipping_date', '');
    params.set('shipping_time_id', '');
    params.set('coupon_id', '');
    params.set('point', '0');
    params.set('payment_id', '2');
    params.set('gmopg_token', '');
    params.set('cardno', '');
    params.set('expire_month', '01');
    params.set('expire_year', '2019');
    params.set('card_customer_name', '');
    params.set('securitycode', '');
    params.set('notes', '');
    params.set('g-recaptcha-response', '03AOLTBLRiwhCaEpRetywTVzgUrEtAGXxfVQWUtr1145aRwozIySrTUwEIEeu_IwFl9xRq3zbi809K3TCu13Ktp0Iz0Ijt8tjIe7BGUaFfe5aAHzFvkdZQ40KMDEf9rEmENP7dEX6pJhAK0F2zB_MY1PpI-Sh8dmYroOJ11nXC2t86pnBCUD1NLpOuIN39qJ_E8fibsw6_QaBJyOeDT8MZRGyTeL0R3ra7c1Vy3ebNrEphWZQ9psAVDdXTd_jsKJ3Q1Vs553DeLH9X-UOKd-dOlG7qJswvTJWAD2LFKhxk_nt6VDXBDgIhiSqaRc-c7aYbd2AGRUSGbud5bFOtjkoSsSJ1Mzu6cOiaSKD4wjfqoLIJlgbfBTEjHEFLyObXT-OMZ36EINt0pB108IGr8eOBcEfZjAVhJb91L9dFjxFt4BWTnXiWw-go0IvEBPCgW2yzTLNqrl8AdlB1p7-YX_1vCZ7CcbofkgIBxCT_dz_u4ncWPpf-gqE0Pdy9ZblcfCYKJNzB566kq9mi');
    postData = params.toString();

    url = 'https://www.atmos-tokyo.com/order/check';
    multiPostHeaders['Cookie'] = cookie; 
    res = await util.request({
        method: 'POST',
        url: url,
        headers: multiPostHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    getHeaders['Cookie'] = cookie;
    url = res.headers['location'];

    while(true) {
      this.log(url, 'redirection');
      res = await this.redirect(res, getHeaders);
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
    params = new URLSearchParams('');
    postData = params.toString();

    url = 'https://www.atmos-tokyo.com/order/store';
    postHeaders['Cookie'] = cookie;
    postHeaders['Content-Length'] = postData.length;
    postHeaders['X-CSRF-TOKEN'] = $('[name="csrf-token"]').attr('content');
    postHeaders['X-Requested-With'] = 'XMLHttpRequest';

    res = await util.request({
        method: 'POST',
        url: url,
        headers: postHeaders,
        data: postData,
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    delete postHeaders['X-CSRF-TOKEN'];
    delete postHeaders['X-Requested-With'];

    this.log(res.body);

    this.dataStore['cookie'] = cookie;
  }
}
export default AtomosTokyo;
