export class ExpoSqliteAdapter {
  constructor(db) {
    this.db = db;
  }

  async exec(sql, params = []) {
    const result = await this.db.runAsync(sql, params);
    return { lastID: result.lastInsertRowId, changes: result.changes };
  }

  async getAll(sql, params = []) {
    return this.db.getAllAsync(sql, params);
  }

  async getFirst(sql, params = []) {
    return this.db.getFirstAsync(sql, params);
  }
}
