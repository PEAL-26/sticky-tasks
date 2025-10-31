import { type SQLiteDatabase } from "expo-sqlite";
//import { initializeDatabase, database } from "@shared/db/connection";
import { initializeDatabase, database } from "@shared/db/connection";
import { ExpoSqliteAdapter } from "@shared/adapters/expo-sqlite";

export const DATABASE_NAME = "sticky_tasks_db";

function adapter(_db: SQLiteDatabase) {
  const db = new ExpoSqliteAdapter(_db);
  return db;
}

export async function migrateDb(_db: SQLiteDatabase) {
  const db = adapter(_db);
  await initializeDatabase(db);
}

export function setupDb(_db: SQLiteDatabase) {
  const db = adapter(_db);
  return database(db);
}
