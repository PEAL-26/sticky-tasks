function initialize(db) {
  const getById = async (id) => {
    try {
      const row = await db.getFirst("SELECT * FROM subtasks WHERE id = ?", [id]);
      return row;
    } catch (error) {
      console.error(`Erro ao buscar subtask com id ${id}:`, error);
      throw error;
    }
  };

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
        const result = await db.exec(
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
        return await getById(result.lastID);
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

        const rows = await db.getAll(query, params);
        return rows;
      } catch (error) {
        console.error(
          `Erro ao listar subtasks para a tarefa ${task_id}:`,
          error
        );
        throw error;
      }
    },
    async getById(id) {
      return await getById(id);
    },
    async update(id, subtaskData) {
      const { description, group_id, note, responsible_id, priority, status } =
        subtaskData;
      try {
        await db.exec(
          "UPDATE subtasks SET description = ?, group_id = ?, note = ?, responsible_id = ?, priority = ?, status = ? WHERE id = ?",
          [description, group_id, note, responsible_id, priority, status, id]
        );
        return await getById(id);
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
