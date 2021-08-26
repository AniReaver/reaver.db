const set = require('lodash/set');

module.exports = function(db, params, options) {

    let entry = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);

    if(!entry) {
        db.prepare(`INSERT INTO ${options.table} (ID,json) VALUES (?,?)`).run(params.id, "{}");
        entry = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);
    }

    entry = JSON.parse(entry.json);

    if(typeof entry === 'object' && params.ops.target) {
        params.data = JSON.parse(params.data);
        params.data = set(entry, params.ops.target, params.data);
    } else if (params.ops.target) throw new TypeError(`Cannot Target A Non-Object Target.`);

    if(typeof params.data != "string") params.data = JSON.parse(params.data);

    db.prepare(`UPDATE ${options.table} SET json = (?) WHERE ID = (?)`).run(params.data, params.id);

    let newData = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id).json;
    if(newData === "{}") return null;
    else {
        newData = JSON.parse(newData);
        return newData;
    }

}