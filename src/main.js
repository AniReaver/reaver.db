module.exports = function(file) {
    const Database = require('better-sqlite3');
    const util = require("util");
    let db;

    if(!db) db = new Database(file || "./json.sqlite");

    var methods = {
        get: require('./lib/get'),
        fetch: require("./lib/fetch"),
        set: require("./lib/set"),
        add: require("./lib/add"),
        subtract: require('./lib/subtract'),
        push: require('./lib/push'),
        delete: require('./lib/delete'),
        deleteAll: require('./lib/deleteAll'),
        has: require('./lib/has'),
        all: require('./lib/all'),
        type: require('./lib/type'),
        createTable: require('./lib/createTable'),
        deleteTable: require('./lib/deleteTable'),
        tables: require('./lib/tables')
    }

    module = {
        version: require('../package.json').version,

        fetch: function(key, ops) {
            if(!key) throw new TypeError("A Key Must Be Provided In The Fetch Function.");
            return arbitrate("get", { id: key, ops: ops || {} });
        },

        get: function(key, ops) {
            if(!key) throw new TypeError("A Key Must Be Provided In The Get Function.");
            return arbitrate("get", { id: key, ops: ops || {} });
        },

        set: function(key, value, ops) {
            if(!key) throw new TypeError("A Key Must Be Provided In The Set Function.");
            if(value === undefined) throw new TypeError("A Value Must Be Provided In The Set Function.");
            return arbitrate("set", {
                id: key,
                data: value,
                ops: ops || {},
            });
        },

        add: function(key, value, ops) {
            if(!key) throw new TypeError("A Key Must Be Provided In The Add Function.");
            if(isNaN(value)) throw new TypeError("A Valid Number Must Be Provided In The Add Function.");
            return arbitrate("add", { id: key, data: value, ops: ops || {} });
        },

        subtract: function(key, value, ops) {
            if(!key) throw new TypeError("A Key Must Be Provided In The Subtract Function.");
            if(isNaN(value)) throw new TypeError("A Valid Number Must Be Provided In The Add Function.");
            return arbitrate("subtract", { id: key, data: value, ops: ops || {} });
        },

        push: function(key, value, ops) {
            if(!key) throw new TypeError("A Key Must Be Provided In The Push Function.");
            if(!value && value != 0) throw new TypeError("A Value Must Be Provided In The Push Function.");
            return arbitrate("push", {
                id: key,
                data: value,
                ops: ops || {}
            })
        },

        delete: function(key, ops) {
            if(!key) throw new TypeError("A Key Must Be Provided In The Delete Function.");
            return arbitrate("delete", { id: key, ops: ops || {} });
        },

        deleteAll: function(ops) {
            return arbitrate("deleteAll", { ops: ops || {} });
        },

        has: function(key, ops) {
            if(!key) throw new TypeError("A Key Must Be Provided In The Has Function.");
            return arbitrate("has", { id: key, ops: ops || {} });
        },

        all: function(ops) {
            return arbitrate("all", { ops: ops || {} });
        },

        getAll: function(ops) {
            return arbitrate("all", { ops: ops || {} });
        },

        fetchAll: function(ops) {
            return arbitrate("all", { ops: ops || {} });
        },

        type: function(key, ops) {
            if(!key) throw new TypeError("A Key Must Be Provided In The Type Function.");
            return arbitrate("type", { id: key, ops: ops || {} });
        },

        createTable: function(ops) {
            return arbitrate("createTable", { ops: ops || {} });
        },

        deleteTable: function(ops) {
            return arbitrate("deleteTable", { ops: ops || {} });
        },

        tables: function(ops) {
            return arbitrate("tables", { ops: ops || {} });
        }
    };

    function arbitrate(method, params, tableName) {
        if(typeof params.id == 'number') params.id = params.id.toString();
        let options = {
            target: params.ops.target,
            table: tableName || params.ops.table || "json"
        };

        db.prepare(`CREATE TABLE IF NOT EXISTS ${options.table} (ID TEXT, json TEXT)`).run();

        if(params.ops.target && params.ops.target[0] === ".") params.ops.target = params.ops.target.slice(1);
        if(params.data && params.data === Infinity) throw new TypeError(`You Can Not Set Infinity To The Database @ ID: ${params.id}`);

        try {
            params.data = JSON.stringify(params.data);
        } catch (e) {
            throw new TypeError(`Please Supply A Valid Input @ ID: ${params.id}\nError: ${e.message}`);
        }

        if(params.id && params.id.includes(".")) {
            let unparsed = params.id.split('.');
            params.id = unparsed.shift();
            params.ops.target = unparsed.join(".");
        }

        return methods[method](db, params, options)
    }

    return module;
}