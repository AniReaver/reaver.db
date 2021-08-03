# How The Package Works?
**It works with a simple 2 lines of code that create the sql database for your project your using**

**Use this for creating:**
```js
const Database = require("reaver.db");
const db = new Database("File Name"); // If there will be no file name it will put the default
```

And thats it!

# The Package's Functions

**Here will be all the functions your can use in this package**

**---------------------------------------------------------------------**

**Add Function:**
```js
db.add("key", "value"); // If there is nothing with this key on the database it will create one for you and automatically be set to 0.
```

**All Function:**
```js
db.all(); // Gets all the data
```

**Delete Function:**
```js
db.delete("key"); // Deletes a key you choose
```

**Fetch Function:**
```js
db.fetch("key") // Fetches a key from the database
```

**Get Function:**
```js
db.get("key"); // Gets a key from the database
```

**Has Function:**
```js
db.has("key"); // Returns a boolean if the database has a key or not
```

**Push Function:**
```js
db.push("key", "value"); // Pushes a value to the database
```

**Fetch All Function:**
```js
db.fetchAll(); // Fetches all the data from the database
```

**Get All Function:**
```js
db.getAll(); // Gets all the data from the database
```

**----------------------------------------------------------------------**

**And Thats All Have Fun With My Package! ✨**