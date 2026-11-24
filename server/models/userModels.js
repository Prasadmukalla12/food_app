export async function createUserModel(db) {
  const users = db.collection('users')
  await users.createIndex({ email: 1 }, { unique: true })

  return {
    createUser: user => users.insertOne(user),
    findByEmail: email => users.findOne({ email }),
  }
}
