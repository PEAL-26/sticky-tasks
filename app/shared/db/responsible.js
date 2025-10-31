function initialize(db) {
  return {
    async create(name) {
      try {
        const result = await db.exec("INSERT INTO responsibles (name) VALUES (?)", [
          name,
        ]);
        return { id: result.lastID, name };
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

        const rows = await db.getAll(query, params);
        return rows;
      } catch (error) {
        console.error("Erro ao listar responsáveis:", error);
        throw error;
      }
    },
    async getById(id) {
      try {
        const row = await db.getFirst("SELECT * FROM responsibles WHERE id = ?", [
          id,
        ]);
        return row;
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
