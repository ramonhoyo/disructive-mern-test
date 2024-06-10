import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { exit } from 'process';
import url from 'url';

dotenv.config();

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('Mongo URI is required');
    exit(1);
  }

  const dbName = url.parse(uri).pathname.split('/').pop();
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db(dbName); // replace with your database name
    const categoriesCollection = database.collection('categories'); // replace with your collection name

    // create an array of documents to insert
    const categories = [
      { name: 'Images', contentTypes: ['Image'] },
      { name: 'Video-url', contentTypes: ['Video'] },
      { name: 'Documents', contentTypes: ['Txt'] },
    ];
    const result = await categoriesCollection.insertMany(categories);

    const usersCollection = database.collection('users');
    const users = [
      { username: 'admin', email: 'admin@example', type: 'Admin' }
    ];

    const usersResult = await usersCollection.insertMany(users);

    console.log(`${result.insertedCount} categories were inserted.`);
    console.log(`${usersResult.insertedCount} users were inserted.`);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

