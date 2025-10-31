function initialize(db) {
  return {
    async create(name) {
      try {
        await db.exec("INSERT INTO responsibles (name) VALUES (?)", [name]);
        const row = await db.exec("SELECT last_insert_rowid() as id");
        return { id: row[0].values[0][0], name };
      } catch (error) {
        console.error("Erro ao criar responsável:", error);
        throw error;
      }
    },
    async listAll(filters = {}) {
      try {
        let query = "SELECT * FROM responsibles WHERE 1=1";
        const params = [];

        if (filters.name) {
          query += " AND name LIKE ?";
          params.push(`%${filters.name}%`);
        }

        const rows = await db.exec(query, params);
        if (rows.length === 0) return [];
        return rows[0].values.map((row) => ({ id: row[0], name: row[1] }));
      } catch (error) {
        console.error("Erro ao listar responsáveis:", error);
        throw error;
      }
    },
    async getById(id) {
      try {
        const rows = await db.exec("SELECT * FROM responsibles WHERE id = ?", [
          id,
        ]);
        if (rows.length === 0) return null;
        const row = rows[0].values[0];
        return { id: row[0], name: row[1] };
      } catch (error) {
        console.error(`Erro ao buscar responsável com id ${id}:`, error);
        throw error;
      }
    },
    async update({ id, name }) {
      try {
        await db.exec("UPDATE responsibles SET name = ? WHERE id = ?", [
          name,
          id,
        ]);
        return { id, name };
      } catch (error) {
        console.error(`Erro ao atualizar responsável com id ${id}:`, error);
        throw error;
      }
    },
    async delete(id) {
      try {
        await db.exec("DELETE FROM responsibles WHERE id = ?", [id]);
        return { message: "Responsável deletado com sucesso." };
      } catch (error) {
        console.error(`Erro ao deletar responsável com id ${id}:`, error);
        throw error;
      }
    },
  };
}

export const responsible = initialize;
