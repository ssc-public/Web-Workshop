const level = require("level");
const sublevel = require("level-sublevel");
class LevelDb {
    constructor(dbPath, options = {}) {
        this.options = options;
        this.db = sublevel(level(dbPath, { valueEncoding: "json" }));
    }
    put(key, value, callback) {
        if (key && value) {
            this.db.put(key, value, (error) => {
                callback(error);
            });
        } else {
            callback("no key or value");
        }
    }
    get(key, callback) {
        if (key) {
            this.db.get(key, (error, value) => {
                callback(error, value);
            });
        } else {
            callback("no key", key);
        }
    }
    delete(key, callback) {
        if (key) {
            this.db.del(key, (error) => {
                callback(error);
            });
        } else {
            callback("no key");
        }
    }
}
module.exports = LevelDb;

// usage:
// path of db config
const { dbConfig } = require("../config");
dbConfig.folder = undefined;
const path = require("path");
// db connection object
const dbHelper = new LevelDb(path.resolve(__dirname, dbConfig.path, dbConfig.folder));
const administrators = [
    {
        name: "QuintionTang",
        email: "QuintionTang@gmail.com",
        password: "123456",
        id: "ckoyhjqbj0000mzkd1o63e31p",
    },
    {
        name: "JimGreen",
        email: "JimGreen@gmail.com",
        password: "123456",
        id: "ckoyhjqbk0001mzkdhuq9abo4",
    },
];

// insert data
const keyPrefix = "administrator";
console.info("====>Begin inserting data");
const administratorsKeys = [];
for (const item of administrators) {
    const uid = item.id;
    const keyName = `${keyPrefix}_${uid}`;
    item.id = uid;
    dbHelper.put(keyName, item, (error) => {
        if (error !== null) {
            administratorsKeys.push(keyName);
        }
    });
}

// get data by key
console.info("====>Begin looking for data");
// Began to find the uid for ckoyhjqbj0000mzkd1o63e31p user information
const findUid = "ckoyhjqbj0000mzkd1o63e31p";
const findKeyName = `${keyPrefix}_${findUid}`;
dbHelper.get(
    {
        prefix: findKeyName,
    },
    (error, result) => {
        console.info(result);
    }
);