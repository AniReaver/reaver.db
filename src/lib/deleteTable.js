module.exports = function(db, params, options) {

    try {
        let entry = db.prepare(`SHOW TABLES`).all();
        let ar = entry.map(x => Object.values(x)).flat(1);

        if(!ar.includes(params.ops.table)) return false;

        db.prepare(`DROP TABLE ${params.ops.table}`).run();
        return true;
    } catch(e) {
        let entry = db.prepare(`SELECT * FROM sqlite_master`).all();
        let ar = entry.map(table => table.name);

        if(!ar.includes(params.ops.table)) return false;

        db.prepare(`DROP TABLE ${params.ops.table}`).run();
        return true;
    }

}