import { MongoClient } from 'mongodb'

export async function connectDB(env) {
  const uri = env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
  const mongo = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 })

  try {
    await mongo.connect()
  } catch (error) {
    await mongo.close()
    throw new Error('Could not connect to MongoDB (' + error.name + ').')
  }

  return {
    db: mongo.db(env.MONGODB_DB || 'delicious'),
    close: () => mongo.close(),
  }
}
