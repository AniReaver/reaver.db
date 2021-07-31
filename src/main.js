module.exports = function(file) {
    const Database = require('better-sqlite3');
    const util = require("util");
    let db;

    if(!db) db = new Database(file || "./json.sqlite");

   var methods = {
        get: require('./methods/get'),
        fetch: require("./methods/fetch"),
        set: require("./methods/set"),
        add: require("./methods/add"),
        subtract: require('./methods/subtract'),
        push: require('./methods/push'),
        delete: require('./methods/delete'),
        has: require('./methods/has'),
        all: require('./methods/all'),
        type: require('./methods/type'),
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

        table: function (tableName, options = {}) {
            // Set Name
            if (typeof tableName !== "string")
                throw new TypeError(
                    "Table name has to be a string. Need Help? Check out: discord.gg/plexidev"
                );
            else if (tableName.includes(" "))
                throw new TypeError(
                    "Table name cannot include spaces. Need Help? Check out: discord.gg/plexidev"
                );
            this.tableName = tableName;

            // Methods
            this.fetch = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: discord.gg/plexidev"
                    );
                return arbitrate(
                    "fetch",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.get = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: discord.gg/plexidev"
                    );
                return arbitrate(
                    "fetch",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.set = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: discord.gg/plexidev"
                    );
                if (!value && value != 0)
                    throw new TypeError(
                        "No value specified. Need Help? Check Out: discord.gg/plexidev"
                    );
                return arbitrate(
                    "set",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.add = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: discord.gg/plexidev"
                    );
                if (isNaN(value))
                    throw new TypeError(
                        "Must specify value to add. Need Help? Check Out: discord.gg/plexidev"
                    );
                return arbitrate(
                    "add",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.subtract = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: discord.gg/plexidev"
                    );
                if (isNaN(value))
                    throw new TypeError(
                        "Must specify value to add. Need Help? Check Out: discord.gg/plexidev"
                    );
                return arbitrate(
                    "subtract",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.push = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: discord.gg/plexidev"
                    );
                if (!value && value != 0)
                    throw new TypeError(
                        "Must specify value to push. Need Help? Check Out: discord.gg/plexidev"
                    );
                return arbitrate(
                    "push",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.delete = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: discord.gg/plexidev"
                    );
                return arbitrate(
                    "delete",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.has = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: discord.gg/plexidev"
                    );
                return arbitrate(
                    "has",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.includes = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: discord.gg/plexidev"
                    );
                return arbitrate(
                    "has",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.fetchAll = function (ops) {
                return arbitrate("all", { ops: ops || {} }, this.tableName);
            };

            this.all = function (ops) {
                return arbitrate("all", { ops: ops || {} }, this.tableName);
            };
        },
    };

    function arbitrate(method, params, tableName) {
        if(typeof params.id == 'number') params.id = params.id.toString();
        let options = {
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