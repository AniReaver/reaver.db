const get = require('lodash/get');
const set = require('lodash/set');

module.exports = function(db, params, options) {

    let entry = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);

    if(!entry) {
        db.prepare(`INSERT INTO ${options.table} (ID,json) VALUES (?,?)`).run(params.id, '{}');
        entry = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);
    }

    if(params.ops.target) {
        entry = JSON.parse(entry);
        params.data = JSON.parse(params.data);
        let oldValue = get(entry, params.ops.target);
        if(oldValue === undefined) oldValue = 0;
        else if(isNaN(oldValue)) throw new TypeError(`Data @ ID: "${params.id}" Is Not A Number.\nFound: ${entry}\nExpected: Number`);
        params.data = set(entry, params.ops.target, oldValue + params.data);
    } else {
        if(entry.json === '{}') entry.json = 0;
        else entry.json = JSON.parse(entry.json);
        if(isNaN(entry.json)) throw new TypeError(`Data @ ID: "${params.id}" Is Not A Number.\nFound: ${entry.json}\nExpected: Number`);
        params.data = parseInt(entry.json, 10) + parseFloat(params.data, 10);
    }

    if(typeof params != "string") params.data = JSON.stringify(params.data);

    db.prepare(`UPDATE ${options.table} SET json = (?) WHERE ID = (?)`).run(params.data, params.id);

    let newData = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id).json;
    if(newData === "{}") return null;
    else {
        newData = JSON.parse(newData);
        return newData;
    }

}