# How The Package Works?
**It works with a simple 2 lines of code that create the json database for your project your using**

**Use this for creating:**
```js
const Database = require("reaver.db");
const db = new Database();
```

And thats it!

# The Package's Functions

**Here will be all the functions your can use in this package**

**---------------------------------------------------------------------**

**Get Function:**
```js
db.get("key");
```

**Set Function:**
```js
db.set("key", "value");
```

**Has Function:**
```js
db.has("key", "value");
```

**Delete Function:**
```js
db.del("key")
```

**Add Function:**
```js
db.add("key", "number/count");
```

**Subtract Function:**
```js
db.subtract("key", "number/count");
```

**Push Function:**
```js
db.push("key", "element");
```

**Delete All Function:**
```js
db.delAll();
```

**Store Function:**
```js
db.store("key"); // No need to use twice! after this use "db.get()"
```

**Get All Function:**
```js
db.getAll();
```

**---------------------------------------------------------------------**

**And Thats All Have Fun With My Package! ✨**