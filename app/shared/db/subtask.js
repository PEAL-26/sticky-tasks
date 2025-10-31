function initialize(db) {
  return {
    async create(subtaskData) {
      const {
        task_id,
        description,
        group_id,
        note,
        responsible_id,
        priority,
        status,
      } = subtaskData;
      try {
        await db.exec(
          "INSERT INTO subtasks (task_id, description, group_id, note, responsible_id, priority, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            task_id,
            description,
            group_id,
            note,
            responsible_id,
            priority,
            status,
          ]
        );
        const row = await db.exec("SELECT last_insert_rowid() as id");
        const id = row[0].values[0][0];
        return getById(id);
      } catch (error) {
        console.error("Erro ao criar subtask:", error);
        throw error;
      }
    },
    async listAllByTaskId(task_id, filters = {}) {
      try {
        let query = "SELECT * FROM subtasks WHERE task_id = ?";
        const params = [task_id];

        if (filters.description) {
          query += " AND description LIKE ?";
          params.push(`%${filters.description}%`);
        }

        if (filters.status) {
          query += " AND status = ?";
          params.push(filters.status);
        }

        const rows = await db.exec(query, params);
        if (rows.length === 0) return [];
        return rows[0].values.map((row) => ({
          id: row[0],
          task_id: row[1],
          description: row[2],
          group_id: row[3],
          note: row[4],
          responsible_id: row[5],
          priority: row[6],
          status: row[7],
          createdAt: row[8],
          updatedAt: row[9],
        }));
      } catch (error) {
        console.error(
          `Erro ao listar subtasks para a tarefa ${task_id}:`,
          error
        );
        throw error;
      }
    },
    async getById(id) {
      try {
        const rows = await db.exec("SELECT * FROM subtasks WHERE id = ?", [id]);
        if (rows.length === 0) return null;
        const row = rows[0].values[0];
        return {
          id: row[0],
          task_id: row[1],
          description: row[2],
          group_id: row[3],
          note: row[4],
          responsible_id: row[5],
          priority: row[6],
          status: row[7],
          createdAt: row[8],
          updatedAt: row[9],
        };
      } catch (error) {
        console.error(`Erro ao buscar subtask com id ${id}:`, error);
        throw error;
      }
    },
    async update(id, subtaskData) {
      const { description, group_id, note, responsible_id, priority, status } =
        subtaskData;
      try {
        await db.exec(
          "UPDATE subtasks SET description = ?, group_id = ?, note = ?, responsible_id = ?, priority = ?, status = ? WHERE id = ?",
          [description, group_id, note, responsible_id, priority, status, id]
        );
        return getById(id);
      } catch (error) {
        console.error(`Erro ao atualizar subtask com id ${id}:`, error);
        throw error;
      }
    },
    async delete(id) {
      try {
        await db.exec("DELETE FROM subtasks WHERE id = ?", [id]);
        return { message: "Subtask deletada com sucesso." };
      } catch (error) {
        console.error(`Erro ao deletar subtask com id ${id}:`, error);
        throw error;
      }
    },
  };
}

export const subtask = initialize;
