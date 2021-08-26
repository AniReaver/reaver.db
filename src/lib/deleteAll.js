module.exports = function(db, params, options) {
    db.prepare(`DELERE FROM ${options.table}`).run();

    let entry = db.prepare(`SELECT * FROM ${options.table}`).run();

    return entry;
}