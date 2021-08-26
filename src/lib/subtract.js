const get = require('lodash/get');
const set = require('lodash/set');

module.exports = function(db, params, options) {

    let entry = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);

    if(!entry) {
        db.prepare(`INSERT INTO ${options.table} (ID,json) VALUES (?,?)`).run(params.id, "{}");
        entry = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);
    }

    if(params.ops.target) {
        entry = JSON.parse(entry.json);
        params.data = JSON.parse(params.data);
        let oldValue = get(entry, params.ops.target);
        if(oldValue === undefined) oldValue = 0;
        else if (isNaN(oldValue)) throw new TypeError(`The Target Is Not A Number.`);
        params.data = set(entry, params.ops.target, oldValue - params.data);
    } else {
        if(entry.json === "{}") entry.json = "{}";
        else entry.json = JSON.parse(entry.json);
        if(isNaN(entry.json)) throw new TypeError(`The Target Is Not A Number.`);
        params.data = parseFloat(entry.json, 10) - parseFloat(params.data, 10);
    }

    if(typeof params.data != "string") params.data = JSON.stringify(paramd.data);

    db.prepare(`UPDATE ${options.table} SET json = (?) WHERE ID = (?)`).run(params.data, params.id);

    let newData = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);
    if(newData === "{}") return null;
    else {
        newData = JSON.parse(newData);
        return newData;
    }

}