# 🌟 **REAVER.DB** 🌟

# **Introduction**
My name is Reaver (AKA LeBanana) and this is my own database,
It can be used for projects and discord bots,
down below will be all the things you need to know about this database!

# Installation
All you need to do is use the cli of npm/yarn to install

**Example**:
```
npm install reaver.db
npm install https://github.com/ItsReaver/reaver.db
yarn add reaver.db
```

# Example Usage
Here is an example for reaver.db usage:

```js
const { Database } = require('reaver.db');
const db = new Database("File Path") // No need to puth the path it will put json.sqlite by default

db.createTable("Items");

db.set("Items", {
    Sword: { ID: 1, Price: 1000 },
    Potion: { ID: 2, Price: 2500 },
    Shield: { ID: 3, Price: 5000 }
});

// You can use that data any further you want with all the methods down below
```

# Methods
Here will be the list of methods and their usages:
```js
db.createTable("Table Name");
db.deleteTable("Existing Table Name");
db.get("key");
db.set("key", value);
db.add("key", number);
db.subtract("key", number);
db.has("key");
db.fetch("key");
db.push("key", element);
db.type("key");
db.deleteAll();
db.getAll();
db.fetchAll();
db.tables();
```

There will be more explained method usages down below 👇

# In code usages
<h3>Here will be more explained functions of the databases</h3>

createTable(name):
```js
db.createTable("Items");

// Insert data into the table
```

deleteTable(name):
```js
db.deleteTable("Items");
```

get(key):
```js
db.get("Items");

console.log(db.get("Items"));
```

set(key, value):
```js
db.set("Items", {
    Sword: { ID: 1, Price: 1000 },
    Potion: { ID: 2, Price: 2500 },
    Shield: { ID: 3, Price: 5000 }
});

console.log(db.get("Items"));
```

add(key, number):
```js
db.add("Coins", 159);

console.log(db.get("Coins"));
```

subtract(key, number):
```js
db.subtract("Coins", 150);

console.log(db.get("Coins"));
```

has(key):
```js
console.log(db.has("Items"));
```

fetch(key):
```js
db.fetch("Items");

console.log(db.fetch("Items"));
```

push(key, element):
```js
db.push("Items", { 
    Bow: { ID: 4, Price: 6000 }
});

console.log(db.get("Items"));
```

type(key):
```js
console.log(db.type("Items"));
```

tables():
```js
console.log(db.tables());
```

# **Utilities**
Here down below will be the usage for creating new util class:
```js
const { Util } = require('reaver.db');
const util = new Util("You File Path");
```

Here down below will be the usage of the utils:

parseDataKey(key):
```js
Util.parseDataKey("coins-88888-88888");

// { id: "coins", target: '88888-88888 };
```

# **Authors**
Me! (Reaver)

# Finishing!
Hope you all liked my package and i hope you will use it!
Thanks for reading this page till the end and understanding the functions and the basics of my database, Hope you guys enjoy and i will see you in my next package 👋