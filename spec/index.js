const { Database, Util } = require('../index');

const db = new Database("./json.sqlite");
db.set("MyData", {
    1: { Name: "Dummy", Ability: "To be a dummy!" }
});

const ReaverUtil = new Util("./json.sqlite");
console.log(ReaverUtil.parseDataKey("pokecoins_38502357802385_392509257809235"))

db.set("Data2", {
    1: { Name: "AI", Ability: "To autocomplete code!" }
});

// db.'method'("key");