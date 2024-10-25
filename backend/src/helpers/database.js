const admin = require('./firebase');
const db = admin.firestore();

class Database {
  constructor(collection) {
    this._collection = collection;
  }

  async getAll() {
    const data = (
      await db.collection(this._collection).orderBy('createdAt').get()
    ).docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  }

  async add(data) {
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    const allData = {
      ...data,
      createdAt: timestamp,
    };
    await db.collection(this._collection).add(allData);
    return data;
  }
}

module.exports = Database;
