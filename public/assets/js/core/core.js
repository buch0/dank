const path = require('path');
import AtmosTokyo from './websites/atmos_tokyo.js';

(function() {
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

    core.vars['websites'] = [
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
    
    //console.log(path.resolve('./src/assets/ds/database.db'));
    var Datastore = require('nedb');
    db = new Datastore({
        filename: path.resolve('./src/assets/ds/database.db'),
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
  async function atmos() {
    var site = new AtmosTokyo('hehe');
    var html = await site.source();

    console.log(html);
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

  async function init() {
    await system();

    window.test = test;
    // await test();

    //console.log(dank);
      //await atmos();
  }

  init();
})();