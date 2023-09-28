const { MongoClient } = require("mongodb");
require("dotenv").config();
const stores = require("./cheers_stores");
const mdb = { name: "NTUC", coll: "stores" };
(async () => {
    try {
        const conn = await MongoClient.connect(process.env.MONGO_URI);
        const db = conn.db(mdb.name);
        const result = await db.collection(mdb.coll).insertMany(stores);
        console.log(result);
        process.exit(0);
    } catch (error) {
        console.log(error);
    }
})();
