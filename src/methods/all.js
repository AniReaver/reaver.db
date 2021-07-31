module.exports = function(db, params, options) {

    var entry = db.prepare(`SELECT * FROM ${options.table} WHERE ID IS NOT NULL`);
    let resp = [];
    for(var row of entry.iterate()) {
        try {

            let data = JSON.parse(row.json);
            if(typeof data == "string") data = JSON.parse(data);
            resp.push({
                ID: row.id,
                data
            })
        } catch (e) {}
    }

    return resp;

}