import { Database } from "arangojs";

const url = process.env.ARANGODB_URL || 'http://root:example@localhost:8529';
const dbName = process.env.ARANGODB_NAME || 'triptych';

export const connectToArangodb = async (): Promise<Database> => {
  const connection = new Database(url);

  const db = connection.database(dbName);

  if (!(await db.exists())) {
    return connection.createDatabase(dbName)
  }

  return db;
}