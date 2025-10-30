import { group } from "./groups.js";
import { responsible } from "./responsible.js";
import { subtask } from "./subtask.js";
import { task } from "./tasks.js";

/**
 * Inicializa o schema do banco de dados, criando as tabelas e triggers necessárias.
 *
 * Esta função espera receber uma instância de banco de dados (db) já aberta,
 * que possui métodos como `exec` ou `execAsync` para executar comandos SQL.
 *
 * Exemplo de uso (web com sqlite3.wasm):
 *   import { DB } from 'sqlite3-wasm'
 *   import { initializeDatabase } from './connection.js'
 *   const db = new DB('mydb.sqlite', 'c')
 *   await initializeDatabase(db)
 *
 * Exemplo de uso (expo-sqlite/native):
 *   import { openDatabaseAsync } from 'expo-sqlite'
 *   import { initializeDatabase } from './connection.js'
 *   const db = await openDatabaseAsync('mydb.db')
 *   await initializeDatabase(db)
 *
 * @param {Object} db Instância do banco de dados, deve ter método `exec` (sync) ou `execAsync` (async).
 * @returns {Promise<void>}
 */
export async function initializeDatabase(db) {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS responsibles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        progress REAL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS subtasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        group_id INTEGER,
        note TEXT,
        responsible_id INTEGER,
        priority INTEGER CHECK(priority IN (0, 1, 2)),
        status TEXT CHECK(status IN ('STATED', 'PENDING', 'DONE')) DEFAULT 'STATED',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
        FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE SET NULL,
        FOREIGN KEY (responsible_id) REFERENCES responsibles(id) ON DELETE SET NULL
      );
    `);

    // Triggers to update 'updated_at' timestamps
    db.exec(`
      CREATE TRIGGER IF NOT EXISTS update_tasks_updated_at
      AFTER UPDATE ON tasks
      FOR EACH ROW
      BEGIN
        UPDATE tasks SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
      END;
    `);

    db.exec(`
      CREATE TRIGGER IF NOT EXISTS update_subtasks_updated_at
      AFTER UPDATE ON subtasks
      FOR EACH ROW
      BEGIN
        UPDATE subtasks SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
      END;
    `);

    console.log("Banco de dados inicializado com sucesso.");
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
    throw error;
  }
}

export const database = (db) => ({
  groups: group(db),
  responsibles: responsible(db),
  tasks: task(db),
  subtasks: subtask(db),
});

export async function initializeAll(_db) {
  await initializeDatabase(_db);
  const db = database(_db);
  return { db };
}
