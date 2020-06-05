const util = window.util;
const cheerio = require("cheerio");

class Isetan {
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

    cookie = 'aam_uuid=74615205103276701402047811874744783264; _fbp=fb.1.1576068604743.2130046435; vcguid=rO0ABXQAJDIwMTkxMjExLTIxNTAwMy00MzUzMDQ2OTUwNjM3NDY5NTY4MA%3D%3D; AMCVS_FF4ABB1A56D5A3687F000101%40AdobeOrg=1; _gcl_au=1.1.2055877127.1576068607; s_ecid=MCMID%7C74228419006252089872082022241515909703; s_acsDate_1st=2019%2F12%2F11; s_cc=true; _ga=GA1.2.1351666858.1576059933; _gid=GA1.2.583591649.1576059933; check=true; cto_lwid=0015f000-941b-4125-93c7-aad51888a98c; mbox=session#75d299b23fb84f069b0acaaef8681bff#1576071236|PC#3789b6fe01a8440fab15a437752157c7.30_26#1639313669; _sprocket_=b6ce7131d12b453492c9c4d21b897bca; s_visit=1; _vcrm=rO0ABXVyABNbTGphdmEubGFuZy5TdHJpbmc7rdJW5%2Bkde0cCAAB4cAAAAAJ0AEAxNjcyNjk5ZmVjZTRjMzZiMjQxMjFiZjI1NGJkMmJiNzhiZmE4YzFkYTJiMTQ5NWJkYjQ1Yjg0OWI4YzM1NDY2dABAOGUxYzliZjVhOTU3ZDk2MTQxYjczZDdjMTUzNzVlNzE5OWNhMDM0YWE0YTdmNjEwYjJlMmE0MDIwNThmNGM5Zg%3D%3D; vcs=rO0ABXQAQGVmMDA1ZTBiZmI3MTg5MDNkNGQwN2NhNDgxYjI0MDlkMmRkMmJiY2M4ZWIwNGFiMjI0NDg4NTYyODY1MWJlNDE%3D; vcss=rO0ABXQAQDJjZWI3MGY4MTE3YmZhZTkyMWJlMTAxMzk1MTU3YmY2YTA2N2JhOTdjYzJiZTNhODNiZmM2NzBiYTViYzQyMjY%3D; AMCV_FF4ABB1A56D5A3687F000101%40AdobeOrg=-1303530583%7CMCIDTS%7C18242%7CMCMID%7C74228419006252089872082022241515909703%7CMCAAMLH-1576735252%7C11%7CMCAAMB-1576735252%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1576137652s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C3.3.0%7CMCCIDH%7C351688549; s_acsDate=2019%2F12%2F12; s_sq=%5B%5BB%5D%5D; _gat=1; s_nr=1576131131412-Repeat; s_prdFndFlg=1';
    this.dataStore['cookie'] = cookie;

    return cookie;
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

    host = 'https://www.mistore.jp';
    // 次回、ヘッダーの定義が多すぎるので一つにオブジェクトを定義して(postHeaders)それを書き換える
    // 初回ログイン　これは購入前に実行する必要があります。

    url = 'https://www.mistore.jp/mypage/im/regist/gp_login?nextUrl=https%3A%2F%2Fwww.mistore.jp%2Fmypage%2Fim%2Finfo%2Fip_top%3Frid%3D0f62bf61cf3747e88c14539bcb6c2de1%26_ga%3D2.216749074.583591649.1576059933-1351666858.1576059933';
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

    params = new URLSearchParams('j_username=&j_password=&j_authenticationstring=0930&_spring_security_remember_me=on&x=187&y=6&j_csrftoken=&spring-security-redirect=https%3A%2F%2Fwww.mistore.jp%2Fmypage%2Fim%2Finfo%2Fip_top%3Frid%3D0f62bf61cf3747e88c14539bcb6c2de1%26_ga%3D2.216749074.583591649.1576059933-1351666858.1576059933&spring-security-this-url=%2Fmypage%2Fim%2Fregist%2Fgp_login%3FnextUrl%3Dhttps%253A%252F%252Fwww.mistore.jp%252Fmypage%252Fim%252Finfo%252Fip_top%253Frid%253D0f62bf61cf3747e88c14539bcb6c2de1%2526_ga%253D2.216749074.583591649.1576059933-1351666858.1576059933');
    params.set('j_username', this.taskData['accounts'][0]['user']);
    params.set('j_password', this.taskData['accounts'][0]['password']);
    params.set('j_csrftoken', $('[name="j_csrftoken"]').val()); // 4桁の画像認証コード
    params.set('j_authenticationstring', '0000');

    postData = params.toString();

    url = host + $('form').attr('action');
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
    let url, ck, cookie, getHeaders, postHeaders, params, postData, res, $ = null, doc = null, host;

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

    host = 'https://www.billys-tokyo.net';

    // ＭＯＵＮＴＡＩＮ　ＪＡＣＫＥＴ（ＮＰ６１８００）
    url = 'https://isetan.mistore.jp/onlinestore/product/0110900000000000000001218457.html';
    getHeaders['Cookie'] = cookie;
    res = await util.request({
        method: 'GET',
        url: url,
        headers: getHeaders,
        data: '',
    });
    ck = util.updateCookieStore(ck, cookie, res);
    cookie = ck.getAll();

    // $ = cheerio.load(res.body);
    doc = str2doc(res.body);

    // sku計算
    let skuInfo = {};
    let colorName = 'ブラック', sizeName = 'XL';
    let mdaItemKey, colorCd, sizeCd;

    for(let i = 0; i < doc.querySelectorAll('script').length; i++) {
      let text = doc.querySelectorAll('script')[i].textContent.replace(/\r?\n?\x20/g, ''), text_;
      console.log(i, text);
      if(text.includes('skuInfo')) {
        // skuInfo
        let subtext = text.substring(text.indexOf('skuInfo=') + 'skuInfo='.length);
        subtext = subtext.substring(0, subtext.indexOf('};') + 1);
        skuInfo = JSON.parse(subtext)
        console.log(JSON.parse(subtext));

        // colorInfo
        subtext = text.substring(text.indexOf('colorInfo=') + 'colorInfo='.length);
        subtext = subtext.substring(0, subtext.indexOf('};') + 1);
        console.log(JSON.parse(subtext));

        // sizeColorInfo
        text = text.replace(/\x22enable\x22\x3afalse\x2c/g, '"enable":false').replace(/\x22enable\x22\x3atrue\x2c/g, '"enable":true');
        subtext = text.substring(text.indexOf('sizeColorInfo=') + 'sizeColorInfo='.length);
        subtext = subtext.substring(0, subtext.indexOf('};') + 1);
        console.log(JSON.parse(subtext));

        // colorSizeInfo
        subtext = text.substring(text.indexOf('colorSizeInfo=') + 'colorSizeInfo='.length);
        subtext = subtext.substring(0, subtext.indexOf('};') + 1);
        console.log(JSON.parse(subtext));

        break;
      }
    }

    Object.getOwnPropertyNames(skuInfo).forEach(name => {
      if(skuInfo[name]['colorName'] === colorName && skuInfo[name]['sizeName'] == sizeName) {
        mdaItemKey = name; colorCd = skuInfo[name]['colorCd']; sizeCd = skuInfo[name]['sizeCd'];
        console.log(mdaItemKey, colorCd, sizeCd);
        return true;
      }
    });


    params = new URLSearchParams(`mdaItemKey=${mdaItemKey}&qty=1&giftPack=false&purPswd=&sc=${colorCd}&ss=${sizeCd}&cq1=&cq2=&cq3=&mediaItemKey=&gpCampaignInfoList=%5B%5D&saleflg=false`);
    postData = params.toString();

    url = 'https://isetan.mistore.jp/onlinestore/product/0110900000000000000001218457.html';
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

    console.log(postData);
    this.dataStore['cookie'] = cookie;

    return res.body;
  }

  // 購入する
  async buy() {
    let url, ck, cookie, getHeaders, postHeaders, params, postData, FormData, res, $ = null, doc = null, host;

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

    host = 'https://www.billys-tokyo.net';

    /*
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
    */

    params = new URLSearchParams('ageConfirmationFlag=0&check-type-01=SEND_TO_HOME_REG_ADDR&receiptWayType=SEND_TO_HOME_REG_ADDR&next=');
    postData = params.toString();

    url = 'https://www.mistore.jp/cart/onlinestore/dept/pp_delivery';
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
    doc = str2doc(res.body);

    // https://www.mistore.jp/cart/onlinestore/dept/pp_dlhome

    FormData = new FormData(doc.querySelector('form'));
    params = new URLSearchParams('next=&selDestinationId=&addordershipping=&usedset=&itemInfo=&addressInputMode=PULL_DOWN&destinationId=-1');
    for(let k of FormData.keys()) {
      if(k.includes('orderDeliveryDtoList[')) {
        params.set(k, FormData.get(k));
      }
    }
    postData = params.toString();

    console.log(postData);
    url = 'https://www.mistore.jp/cart/onlinestore/dept/pp_dlhome';
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
    
    // https://www.mistore.jp/cart/onlinestore/dept/pp_payment
    // 代引き
    params = new URLSearchParams('paymentMethod=CASHONDELIVERY&paymentMethodHid=CASHONDELIVERY&regFinishedMiCardUsageFlg=false&newMiCardInfo.creditCardNo=&newMiCardInfo.creditCardExpirationDateMonth=&newMiCardInfo.creditCardExpirationDateYear=&newMiCardInfo.creditCardHolderName=&newMiCardInfo.creditCardPaymentCount=1%40%EF%BC%91%E5%9B%9E&newMiCardInfo.creditCardBrandCode=01&newMiCardInfo.creditCardBrandName=&newMiCardInfo.creditCardSecurityCode=&regFinishedCardUsageFlag=false&newCreditCardInfo.creditCardBrandCode=&newCreditCardInfo.creditCardNo=&newCreditCardInfo.creditCardExpirationDateMonth=&newCreditCardInfo.creditCardExpirationDateYear=&newCreditCardInfo.creditCardHolderName=&newCreditCardInfo.creditCardPaymentCount=&newCreditCardInfo.creditCardSecurityCode=&_creditCardRegistrationFlag=on&tomonokaiCardNo=&tomonokaiPassword=&tomonokaiCardBalance=&tomonokaiCardNoBalanceConfirm=&convenienceId=&netBankingId=&amazonOrderReferenceId=&portiaMemberDto.portiaMemberNo=&portiaMemberDto.portiaUserLastNameRoma=&portiaMemberDto.portiaUserFirstNameRoma=&portiaMemberDto.portiaSecureCode=&shareholderYutaiCardNo=&shareholderYutaiSecurityCode=&temporaryMiDisCountCode=&inquiryTel=&receiptAddressee=&receiptProviso=%E3%81%8A%E5%93%81%E4%BB%A3&receiptflg=1&corpMemberFlg=0&introduceflg=0&pntUsagCardType=70001&pntUsagInfoPaymentDto.pntBlc=0&pntUsagInfoPaymentDto.pntBeforeUsageAmount=0&_pntUsagInfoPaymentDto.allPntUsageCheckFlg=on&hidMicardPointFlg=0&hidShareholderYutaiFlg=1&hidTemporaryMiYutaiFlg=1&hidMicardCount=0&newCreditCardInfo.token=&newCreditCardInfo.paygentTokenRes=&next=');
    postData = params.toString();

    
    url = 'https://www.mistore.jp/cart/onlinestore/dept/pp_payment';
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

    // 最後のプロセス iqosと同じbot検知のスクリプトが使われてるから、js実行しないといけない。。。
    // https://www.mistore.jp/cart/onlinestore/dept/pp_order
    params = new URLSearchParams('next=&requestKey=&giftFlg=false&token=&multiRequestToken=&rdToken=&siteType=d');
    params.set('requestKey', $('[name="requestKey"]').val());
    params.set('token', $('[name="token"]').val());
    params.set('multiRequestToken', $('[name="multiRequestToken"]').val());
    params.set('rdToken', $('[name="rdToken"]').val());
    postData = params.toString();
    
    url = 'https://www.mistore.jp/cart/onlinestore/dept/pp_order';
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

    this.dataStore['cookie'] = cookie;

    return res.body;
  }
}
export default Isetan;
