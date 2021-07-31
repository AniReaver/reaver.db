const unset = require(`lodash/unset`);

module.exports = function(db, params, options) {

    let entry = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);
    if(!entry) return false;
    else entry = JSON.parse(entry.json);

    if(typeof entry === 'object' && params.ops.target) {
        unset(entry, params.ops.target);
        entry = JSON.parse(entry);
        db.prepare(`UPDATE ${options.table} SET json = (?) WHERE ID = (?)`).run(entry, params.id)
    }
    else if (params.ops.target) throw new TypeError(`The Target You Chose IS Not An Object.`);
    else db.prepare(`DELETE FROM ${options.table} WHERE ID = (?)`).run(params.id);

    return true;
}