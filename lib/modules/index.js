const { existsSync, writeFileSync, readFileSync } = require('fs');

module.exports = class Json {
    constructor() {
        this.data = {};
        const json = "data.json";

        this.savedDataCheck = () => { const savedData = JSON.parse(readFileSync('data.json')); if(typeof savedData === "string") { data = savedData; } }
        this.getData = () => { return data; };
        this.save = () => { return writeFileSync('data.json', JSON.stringify(this.data, null, 4), "utf-8"); }
        this.add = (key, count) => { if(!this.data[key]) this.data[key] = 0; this.data[key] += count; this.save(); }
        this.del = (key) => { delete this.data[key]; save(); }
        this.delAll = () => { this.data = {}; this.save(); }
        this.get = (key) => { if(!this.data[key]) { this.data[key] = null; this.save(); } return this.data[key]; }
        this.getAll = () => { return Object.keys(this.data).map((key) => { return { key, data: this.data[key] } }) }
        this.has = (key) => { return Boolean(this.data[key]) }
        this.push = (key, element) => { if(!this.data[key]) this.data[key] = []; this.data[key].push(element); this.save(); }
        this.set = (key, value) => { this.data[key] = value; this.save(); }
        this.subtract = (key, count) => { if(!this.data[key]) this.data[key] = 0; this.data[key] -= count; this.save(); }

        if(!existsSync(json)){
            writeFileSync(json, "{}", "utf-8");
        } else {
            this.savedDataCheck();
        };
    };
};