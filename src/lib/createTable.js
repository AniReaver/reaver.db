module.exports = function(db, params, options) {

    try {
        let entry = db.prepare(`SHOW TABLES`).all();
        let ar = entry.map(x => Object.values(x)).flat(1);

        if(!params) params = {};
        if(!params.ops) params.ops = {};

        if(!params.ops.table) return false;

        if(!ar.includes(params.ops.table)) return false;

        db.prepare(`CREATE TABLE IF NOT EXISTS ${params.ops.table} (ID TEXT, json TEXT)`).run();
        return true;
    } catch(e) {
        let entry = db.prepare(`SELECT * FROM sqlite_master`).all();
        let ar = entry.map(table => table.name);

        if(!params) params = {};
        if(!params.ops) params.ops = {};

        if(!params.ops.table) return false;

        if(!ar.includes(params.ops.table));

        db.prepare(`CREATE TABLE IF NOT EXISTS ${options.table} (ID TEXT, json TEXT)`).run();
        return true;
    }

}