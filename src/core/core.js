import AtmosTokyo from './websites/atmos_tokyo';
import BillysTokyo from './websites/billys_tokyo';
import Rakuten from './websites/rakuten';
import BapeJP from './websites/bape_jp';
import MitaSneakers from './websites/mita_sneakers';
import Isetan from './websites/isetan';
import UndefeatedJP from './websites/undefeated_jp';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

const path = require('path');
const electron = window.electron;
const util = window.util;
const request = window.request;
const iconvLite = require('iconv-lite');

function doRequest(options) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(res);
      } else {
        reject(error);
      }
    });
  });
}
(async () => {
  async function redirect(response_, headers_) {
    if(response_.headers['location'] === undefined)
      return response_;

    var response = await util.request({
      url: response_.headers['location'],
      method: 'GET',
      headers: headers_,
      data: '',
    });

    return response;
  }

  var dank, db;
  async function system() {
    var retailers = [
      { id: 1, name: 'snkrs' },
      {  }];

    dank = {
        retailers: retailers, tasks: [], proxies: [], billing: [], accounts: [], queues: {
            types: {
                '1': [],
                '2': [],
            }
        }
    };

    window.core = {
      retailer: {
        
      },
      task: {
        create: async function(o) {
          /*
          var id = ++this.vars.index;

          var o_ = {
            id: id,
          };
          Object.assign(o_, o);
          */

          var id = o.id;
          dank.tasks.push(o);

          /*
          o['id'] = id;
          dank.tasks.push(o);
          */
          dank = (await execdb()).dank;
          return id;
        },
        get: function(id) {
          var idx = this.util.findIndex(id);
          return dank.tasks[idx];
        },
        update: async function(id, o) {
          var idx = this.util.findIndex(id);
          dank.tasks[idx] = o;

          dank = (await execdb()).dank;
        },
        delete: async function(id) {
          var idx = this.util.findIndex(id);
          dank.tasks.splice(idx, 1);

          dank = (await execdb()).dank;
        },
        getIds: function() {
          var arr = [];
          dank.tasks.forEach(v => {
            arr.push(v.id);
          });

          return arr;
        },
        getAll: function() {
          return dank.tasks.length == 0? [] : Object.assign([], dank.tasks);
        },
        util: {
          findIndex: function(id) {
            var idx = -1;
            dank.tasks.forEach((v, i) => {
              if(v.id === id) {
                idx = i;
                return true;
              }
            });
            return idx;
          },
        },
        vars: {
          index: -1,
        }
      },
      proxy: {
        create: async function(o) {
          var id = o.id;

          dank.proxies.push(o);
          
          dank = (await execdb()).dank;
          return id;
        },
        get: function(id) {
          var idx = this.util.findIndex(id);
          return dank.proxies[idx];
        },
        update: async function(id, o) {
          var idx = this.util.findIndex(id);
          dank.proxies[idx] = o;

          dank = (await execdb()).dank;
        },
        delete: async function(id) {
          var idx = this.util.findIndex(id);
          dank.proxies.splice(idx, 1);

          dank = (await execdb()).dank;
        },
        getIds: function() {
          var arr = [];
          dank.proxies.forEach(v => {
            arr.push(v.id);
          });

          return arr;
        },
        getAll: function() {
          return dank.proxies.length == 0? [] : Object.assign([], dank.proxies);
        },
        util: {
          findIndex: function(id) {
            var idx = -1;
            dank.proxies.forEach((v, i) => {
              if(v.id === id) {
                idx = i;
                return true;
              }
            });
            return idx;
          },
        },
      },
      billing: {
        create: async function(o) {
          var id = o.id;

          dank.billing.push(o);
          
          dank = (await execdb()).dank;
          return id;
        },
        get: function(id) {
          var idx = this.util.findIndex(id);
          return dank.billing[idx];
        },
        update: async function(id, o) {
          var idx = this.util.findIndex(id);
          dank.billing[idx] = o;

          dank = (await execdb()).dank;
        },
        delete: async function(id) {
          var idx = this.util.findIndex(id);
          dank.billing.splice(idx, 1);

          dank = (await execdb()).dank;
        },
        getIds: function() {
          var arr = [];
          dank.billing.forEach(v => {
            arr.push(v.id);
          });

          return arr;
        },
        getAll: function() {
          return dank.billing.length == 0? [] : Object.assign([], dank.billing);
        },
        util: {
          findIndex: function(id) {
            var idx = -1;
            dank.billing.forEach((v, i) => {
              if(v.id === id) {
                idx = i;
                return true;
              }
            });
            return idx;
          },
        },
      },
      account: {
        create: async function(o) {
          var id = o.id;

          dank.accounts.push(o);
          
          dank = (await execdb()).dank;
          return id;
        },
        get: function(id) {
          var idx = this.util.findIndex(id);
          return dank.accounts[idx];
        },
        update: async function(id, o) {
          var idx = this.util.findIndex(id);
          dank.accounts[idx] = o;

          dank = (await execdb()).dank;
        },
        delete: async function(id) {
          var idx = this.util.findIndex(id);
          dank.accounts.splice(idx, 1);

          dank = (await execdb()).dank;
        },
        getIds: function() {
          var arr = [];
          dank.accounts.forEach(v => {
            arr.push(v.id);
          });

          return arr;
        },
        getAll: function() {
          return dank.accounts.length == 0? [] : Object.assign([], dank.accounts);
        },
        util: {
          findIndex: function(id) {
            var idx = -1;
            dank.accounts.forEach((v, i) => {
              if(v.id === id) {
                idx = i;
                return true;
              }
            });
            return idx;
          },
        },
      },
      getObject: function(name) {
        return eval(name);
      },
      vars: {

      }
    };

    window.core.vars['websites'] = [
      {
        value: "abc mart",
        label: "abc mart"
      },
      {
        value: "Adidas JP",
        label: "Adidas JP"
      },
      {
        value: "arktz",
        label: "arktz"
      },
      {
        value: "Atmos Tokyo",
        label: "Atmos Tokyo"
      },
      {
        value: "Bape JP",
        label: "Bape JP"
      },
      {
        value: "billy’s",
        label: "billy’s"
      },
      {
        value: "CJ Mart",
        label: "CJ Mart"
      },
      {
        value: "Gallery2",
        label: "Gallery2"
      },
      {
        value: "Instants",
        label: "Instants"
      },
      {
        value: "Isetan",
        label: "Isetan"
      },
      {
        value: "Mita Sneakers",
        label: "Mita Sneakers"
      },
      {
        value: "Mortar",
        label: "Mortar"
      },
      {
        value: "NBHD",
        label: "NBHD"
      },
      {
        value: "Parksider",
        label: "Parksider"
      },
      {
        value: "RAKUTEN",
        label: "RAKUTEN"
      },
      {
        value: "Reebok JP",
        label: "Reebok JP"
      },
      {
        value: "Sacai",
        label: "Sacai"
      },
      {
        value: "SNKRS JP",
        label: "SNKRS JP"
      },
      {
        value: "Soph Online",
        label: "Soph Online"
      },
      {
        value: "Spotaka",
        label: "Spotaka"
      },
      {
        value: "Supreme JP",
        label: "Supreme JP"
      },
      {
        value: "Tyron",
        label: "Tyron"
      },
      {
        value: "Ugshaft",
        label: "Ugshaft"
      },
      {
        value: "Undefeated JP",
        label: "Undefeated JP"
      },
      {
        value: "Xebio online",
        label: "Xebio online"
      },
      {
        value: "Yahoo Shopping",
        label: "Yahoo Shopping"
      },
      {
        value: "Yamaotoko",
        label: "Yamaotoko"
      },
      {
        value: "Zozotown",
        label: "Zozotown"
      }
    ];
    
    window.core.vars['loaded'] = false;

    let cd = electron.getGlobal('path');
    let filename = '';
    if(cd.includes('\\')) {
      filename = 'heoo.db';
    }
    console.log(filename);
    var Datastore = require('nedb');
    db = new Datastore({
        filename: 'hihi.db', // issue, didn't create db file and i can't find the location.
        autoload: true
    });

    const execdb = (readOnly = false) => {
      var created_at = new Date().getTime(), updated_at = created_at;
      var doc = {
          dank: dank,
          created_at: created_at,
          updated_at: updated_at,
      };
      var retailers = [
        { id: 1, name: 'snkrs' },
        {  }];

      return new Promise(resolve => {
          // insert or update doc
          db.find({}, function (err, docs) {
            console.log(docs);
              if (docs.length == 0) {
                  // insert
                  db.insert(doc, function (error, newDoc) {
                      resolve(newDoc);
                  });
              } else {
                  if (readOnly) {
                      // check for retailers updates
                      if (JSON.stringify(retailers) !== JSON.stringify(docs[0].dank.retailers)) {
                          // update
                          docs[0].dank.retailers = retailers;
                          db.update({ _id: docs[0]._id }, {
                              dank: docs[0].dank,
                              created_at: docs[0].created_at,
                              updated_at: doc.updated_at,
                          }, function (error) {
                              resolve({
                                  dank: docs[0].dank,
                                  created_at: docs[0].created_at,
                                  updated_at: doc.updated_at,
                              });
                          });
                      } else {
                          // nothing
                          resolve(docs[0]);
                      }
                  } else {
                      // update
                      db.update({ _id: docs[0]._id }, {
                          dank: doc.dank,
                          created_at: docs[0].created_at,
                          updated_at: doc.updated_at,
                      }, function (error) {
                          resolve({
                              dank: doc.dank,
                              created_at: docs[0].created_at,
                              updated_at: doc.updated_at,
                          });
                      });
                  }
              }
          });
      });
    };

    dank = (await execdb(true)).dank;

    // update indices
    /*
    if(dank.tasks.length != 0)
      sys.task.vars.index = dank.tasks.slice(-1)[0].id;
    else
      sys.task.vars.index = 0;
    */
  }
  async function atmos_tokyo() {
    let site, result;
    const taskData = {
      accounts: [{
        user: 'abc@suddenattack.ga',
        password: 'saruma123',
      }],
    };
    
    site = new AtmosTokyo(taskData);
    result = await site.login();
    result = await site.cartIn();
    result = await site.buy();
    
  }
  async function billys_tokyo() {
    let site, result;
    const taskData = {
      accounts: [{
        user: 'abc@suddenattack.ga',
        password: 'saruma123',
      }],
    };
    
    site = new BillysTokyo(taskData);
    result = await site.login();
    result = await site.cartIn();
    result = await site.buy();
  }
  async function bape_jp() {
    let site, result;
    const taskData = {
      accounts: [{
        user: '2501030096564',
        password: 'saruma123',
      }],
    };
    
    site = new BapeJP(taskData);
    result = await site.login();
    result = await site.cartIn();
    result = await site.buy();
  }
  async function mita_sneakers() {
    let site, result;
    const taskData = {
      accounts: [{
        user: 'abc@suddenattack.ga',
        password: 'saruma123',
      }],
    };
    
    site = new MitaSneakers(taskData);
    result = await site.login();
    result = await site.cartIn();
    result = await site.buy();
  }
  async function isetan() {
    let site, result;
    const taskData = {
      accounts: [{
        user: 'abc@suddenattack.ga',
        password: 'saruma123',
      }],
    };
    
    site = new Isetan(taskData);
    result = await site.login();
    result = await site.cartIn();
  }
  async function undefeated_jp() {
    let site, result;
    const taskData = {
      accounts: [{
        user: 'abc@suddenattack.ga',
        password: 'saruma123',
      }],
    };
    
    site = new UndefeatedJP(taskData);
    result = await site.login();
    // result = await site.cartIn();
  }
  async function rakuten() {
    let site, result;
    const taskData = {
      accounts: [{
        user: 'bun001@gmail.com',
        password: 'manko123',
      }],
    };

    site = new Rakuten(taskData);
    result = await site.login();
    result = await site.skipReLogin();
    return;
    result = await site.cartIn();
    result = await site.buy();
  }
  
  async function test() {
    var now = new Date().getTime();
    var response = await util.request({
      url: 'https://supremenewyork.com/index',
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate',
      },
      data: '',
    });

    var et = (new Date().getTime() - now);
    if(et < 43)
      console.log(et + 'ms');

    response = null;
  }
  async function test() {
    var now = new Date().getTime();
    var response = await util.request({
      url: 'https://item.rakuten.co.jp/arimas/9419838/?iasid=07rpp_10095___ee-k6e9xml4-qjr-0ac3b687-e4e9-4298-a6e3-044161f0127c',
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate',
        'Cookie': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
        'accept-language': 'ja',
        'User-Agent': 'abc'
      },
      data: '',
    }, 'euc-jp');

    var et = (new Date().getTime() - now);
    console.log(et + 'ms');

    response = null;
  }


  // requestは変換機能が少ないので使わない
  async function test2() {
    var now = new Date().getTime();
    var response = await doRequest({
      url: 'https://item.rakuten.co.jp/arimas/9419838/?iasid=07rpp_10095___ee-k6e9xml4-qjr-0ac3b687-e4e9-4298-a6e3-044161f0127c',
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate',
        'Cookie': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
        'accept-language': 'ja',
        'User-Agent': 'abc'
      },
      encoding: null,
    });

    var et = (new Date().getTime() - now);
    console.log(et + 'ms');

    console.log(iconvLite.decode(response.body, 'euc-jp'));
    response = null;
  }

  async function init() {
    await system();
    window.core.vars['loaded'] = true;

    window.test = test;
    window.test2 = test2;
    window.atmos_tokyo = atmos_tokyo;
    window.billys_tokyo = billys_tokyo;
    window.bape_jp = bape_jp;
    window.mita_sneakers = mita_sneakers;
    window.isetan = isetan;
    window.undefeated_jp = undefeated_jp;
    window.rakuten = rakuten;
  }

  await init();
})();