const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();
const fetch = require("cross-fetch");
const storesUrl = "https://public-api.omni.fairprice.com.sg/stores";
const mdb = { name: "NTUC", coll: "stores" };

const getStores = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.log("MONGO_URI not defined!");
            process.exit(1);
        }
        const conn = await MongoClient.connect(process.env.MONGO_URI);
        const db = conn.db(mdb.name);

        const res = await fetch(storesUrl);
        const data = await res.json();
        console.log(data.data.fpstores);
        const result = await db.collection(mdb.coll).insertMany(data.data.fpstores);
        console.log(result);
        process.exit(0);
    } catch (error) {
        console.log(error);
    }
};

getStores();
