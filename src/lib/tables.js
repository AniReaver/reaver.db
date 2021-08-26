module.exports = function(db, params, options) {
    try {
        let entry = db.prepare(`SHOW TABLES`).all();
        return entry.map(x => Object.values(x)).flat(1);
    } catch(e) {
        let entry = db.prepare(`SELECT * FROM sqlite_master`).all();
        return entry.map(table => table.name);
    }
}