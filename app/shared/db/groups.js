function initialize(db) {
  return {
    async create(name) {
      try {
        const result = await db.exec("INSERT INTO groups (name) VALUES (?)", [
          name,
        ]);
        return { id: result.lastID, name };
      } catch (error) {
        console.error("Erro ao criar grupo:", error);
        throw error;
      }
    },
    async listAll(filters = {}) {
      try {
        let query = "SELECT * FROM groups WHERE 1=1";
        const params = [];

        if (filters.name) {
          query += " AND name LIKE ?";
          params.push(`%${filters.name}%`);
        }

        const rows = await db.getAll(query, params);
        return rows;
      } catch (error) {
        console.error("Erro ao listar grupos:", error);
        throw error;
      }
    },
    async getById(id) {
      try {
        const row = await db.getFirst("SELECT * FROM groups WHERE id = ?", [
          id,
        ]);
        return row;
      } catch (error) {
        console.error(`Erro ao buscar grupo com id ${id}:`, error);
        throw error;
      }
    },
    async update({ id, name }) {
      try {
        await db.exec("UPDATE groups SET name = ? WHERE id = ?", [name, id]);
        return { id, name };
      } catch (error) {
        console.error(`Erro ao atualizar grupo com id ${id}:`, error);
        throw error;
      }
    },
    async delete(id) {
      try {
        await db.exec("DELETE FROM groups WHERE id = ?", [id]);
        return { message: "Grupo deletado com sucesso." };
      } catch (error) {
        console.error(`Erro ao deletar grupo com id ${id}:`, error);
        throw error;
      }
    },
  };
}

export const group = initialize;
