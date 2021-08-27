const { readFileSync, existsSync } = require('fs');

module.exports = class Util {
    constructor(file) {
        if(!file) throw new TypeError("A Database file must be specified!");
        if(!existsSync(file)) throw new TypeError("The database file is not created!");

        this.file = file;
    }
    
    /**
     * Parse a database key to an object
     * @param {String} key Our key to parse
     */
    async parseDataKey(key) {
        if(!this.file) throw new TypeError("A Database file must be specified!");
        if(!existsSync(this.file)) throw new TypeError("The database file is not created!");

        if(!key || typeof key !== "string") return { id: null, target: null };
        if(key) {
            if(key.includes(".")) {
                let split = key.split(".");
                let parsed = split.shift();
                let target = split.join(".");
                return { id: parsed, target: target };
            }
            if(key.includes("-")) {
                let split = key.split("-");
                let parsed = split.shift();
                let target = split.join("-");
                return { id: parsed, target: target };
            }
            if(key.includes("_")) {
                let split = key.split("_");
                let parsed = split.shift();
                let target = split.join("_");
                return { id: parsed, target: target };
            }
        }
        else return { id: key, target: null }
    }
}