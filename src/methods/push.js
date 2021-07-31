const get = require("lodash/get");
const set = require('lodash/set');

module.exports = function(db, params, options) {

    let entry = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);
    
    if(!entry) {
        db.prepare(`INSERT INTO ${options.table} (ID,json) VALUES (?,?)`).run(params.id, '{}');
        entry = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);
    };

    if(params.ops.target) {
        entry = JSON.parse(entry.json);
        params.data = JSON.parse(params.data);
        if(typeof entry !== "object") throw new TypeError(`Cannot Push Into A Non-Object Target.`);
        let oldArray = get(entry, params.ops.target);
        if(oldArray === undefined) oldArray = [];
        else if(!Array.isArray(oldArray)) throw new TypeError(`The Target Is Not An Array.`);
        oldArray.push(params.data);
        params.data = set(entry, params.ops.target, oldArray);
    } else {
        if(entry.json === "{}") entry.json = "[]";
        else entry.json = JSON.parse(entry.json);
        params.data = JSON.parse(params.data);
        if(!Array.isArray(entry.json)) throw new TypeError(`The Target Is Not An Array`);
        entry.json.push(params.data);
        params.data = entry.json;
    }

    if(typeof params.data != "string") params.data = JSON.stringify(params.data);

    db.prepare(`UPDATE ${options.table} SET json = (?) WHERE ID = (?)`).run(params.data, params.id);

    let newData = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id).json;
    if(newData === "{}") return null;
    else {
        newData = JSON.parse(newData);
        return newData;
    }

}