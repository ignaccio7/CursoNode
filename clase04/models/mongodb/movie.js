/**------------- CONNECTION TO DATABASE */
// npm install mongodb -E
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

const uri = "mongodb+srv://ignaccio7:260298nesig@products.loa7ehl.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connect() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db('movies')
        return database.collection('movie')
    } catch (error) {
        console.log("Error connecting to database");
        console.log(error);
        await client.close();
    }
    //   finally {
    //     // Ensures that the client will close when you finish/error
    //   }
}


/**------------- CREATE CLASS */

export class MovieModel {

    static async getAll({ genre }) {
        const db = await connect()
        if (genre) {
            return db.find({
                genre: {
                    $elemMatch: {
                        $regex: genre,
                        $options: 'i'
                    }
                }
            }).toArray()
        }

        return db.find({}).toArray()

    }

    static async getById ({ id }) {
        const db = await connect()
        const objectId = new ObjectId(id)
        return db.findOne({ _id: objectId })
    }
    
    static async create ({ input }){
        const db = await connect()

        const { insertedId } = await db.insertOne(input)

        return {
            id: insertedId,
            ...input
        }

    }

    static async delete ({ id }){
        const db = await connect()
        const objectId = new ObjectId(id)

        const { deletedCount } = await db.deleteOne({ _id: objectId })
        return deletedCount > 0
    }

    static async update ({ id, input }){
        const db = await connect()
        const objectId = new ObjectId(id)

        const { ok, value } = await db.findOneAndUpdate({ _id: objectId },{ $set: input },{ returnNewDocument: true  })
        if (!ok) {
            return false
        }

        return value
    }

}

