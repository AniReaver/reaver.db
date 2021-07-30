const { existsSync, writeFileSync, readFileSync } = require('fs');

module.exports = class Json {
    constructor() {
        this.data = {};
        const json = "data.json";

        this.savedDataCheck = function () { const savedData = JSON.parse(readFileSync('data.json')); if(typeof savedData === "string") { data = savedData; } }
        this.getData = function () { return data; };
        this.save = function () { return writeFileSync('data.json', JSON.stringify(this.data, null, 4), "utf-8"); }
        this.add = function (key, count) { if(!this.data[key]) this.data[key] = 0; this.data[key] += count; this.save(); }
        this.del = function (key) { if(!this.data[key]) throw new TypeError("No Key To Delete."); delete this.data[key]; this.save(); }
        this.delAll = function () { if(!this.data) throw new TypeError("No Data To Delete."); this.data = {}; this.save(); }
        this.get = function (key) { if(!this.data[key]) { this.data[key] = 0; this.save(); } return this.data[key]; }
        this.getAll = function () { if(!this.data) throw new TypeError("No Data To Get."); return Object.keys(this.data).map((key) => { return { key, data: this.data[key] } }) }
        this.has = function (key) { if(!this.data[key]) throw new TypeError("No Key To Check."); return Boolean(this.data[key]) }
        this.push = function (key, element) { if(!this.data[key]) this.data[key] = []; this.data[key].push(element); this.save(); }
        this.set = function (key, value) { if(!this.data[key]) this.data[key] = value; this.data[key] = value; this.save(); }
        this.subtract = function (key, count) { if(!this.data[key]) this.data[key] = 0; this.data[key] -= count; this.save(); }

        if(!existsSync(json)){
            writeFileSync(json, "{}", "utf-8");
        } else {
            this.savedDataCheck();
        };
    };
};