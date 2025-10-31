function initialize(db) {
  const getById = async (id) => {
    try {
      const task = await db.getFirst("SELECT * FROM tasks WHERE id = ?", [id]);
      if (!task) return null;

      const subtasks = await db.getAll(
        `SELECT 
          s.id, s.description, s.note, s.priority, s.status, s.created_at, s.updated_at,
          g.id as group_id, g.name as group_name,
          r.id as responsible_id, r.name as responsible_name
        FROM subtasks s
        LEFT JOIN groups g ON s.group_id = g.id
        LEFT JOIN responsibles r ON s.responsible_id = r.id
        WHERE s.task_id = ?`,
        [id]
      );

      return {
        ...task,
        subtasks: subtasks.map((row) => ({
          id: row.id,
          description: row.description,
          note: row.note,
          priority: row.priority,
          status: row.status,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          group: row.group_id ? { id: row.group_id, name: row.group_name } : undefined,
          responsible: row.responsible_id ? { id: row.responsible_id, name: row.responsible_name } : undefined,
        })),
      };
    } catch (error) {
      console.error(`Erro ao buscar tarefa com id ${id}:`, error);
      throw error;
    }
  };

  return {
    async listAll(filters = {}) {
      try {
        let tasksQuery;
        const params = [];

        if (filters.search) {
          tasksQuery = `
        SELECT DISTINCT
          t.id,
          t.title,
          t.progress,
          t.updated_at,
          (SELECT COUNT(id) FROM subtasks WHERE task_id = t.id) as total_subtasks
        FROM tasks t
        LEFT JOIN subtasks s ON s.task_id = t.id
        LEFT JOIN groups g ON s.group_id = g.id
        LEFT JOIN responsibles r ON s.responsible_id = r.id
        WHERE
          t.title LIKE ? OR
          s.description LIKE ? OR
          s.note LIKE ? OR
          g.name LIKE ? OR
          r.name LIKE ?
        ORDER BY t.updated_at DESC
      `;
          const searchTerm = `%${filters.search}%`;
          params.push(
            searchTerm,
            searchTerm,
            searchTerm,
            searchTerm,
            searchTerm
          );
        } else {
          tasksQuery = `
        SELECT
          t.id,
          t.title,
          t.progress,
          t.updated_at,
          (SELECT COUNT(id) FROM subtasks WHERE task_id = t.id) as total_subtasks
        FROM tasks t
        ORDER BY t.updated_at DESC
      `;
        }

        const tasks = await db.getAll(tasksQuery, params);

        for (let i = 0; i < tasks.length; i++) {
          const subtasks = await db.getAll(
            "SELECT id, description FROM subtasks WHERE task_id = ? LIMIT 3",
            [tasks[i].id]
          );
          tasks[i].subtasks = subtasks.map((row) => ({
            id: row.id,
            description: row.description,
          }));
        }

        return tasks.map((task) => ({
          id: task.id,
          title: task.title,
          progress: task.progress,
          updatedAt: task.updated_at,
          totalSubtasks: task.total_subtasks,
          subtasks: task.subtasks || [],
        }));
      } catch (error) {
        console.error("Erro ao listar tarefas:", error);
        throw error;
      }
    },
    async getById(id) {
      return await getById(id);
    },
    async create({ title, progress = 0 }) {
      try {
        const result = await db.exec("INSERT INTO tasks (title, progress) VALUES (?, ?)", [
          title,
          progress,
        ]);
        return await getById(result.lastID);
      } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        throw error;
      }
    },
    async update({ id, title, progress }) {
      try {
        await db.exec("UPDATE tasks SET title = ?, progress = ? WHERE id = ?", [
          title,
          progress,
          id,
        ]);
        return await getById(id);
      } catch (error) {
        console.error(`Erro ao atualizar tarefa com id ${id}:`, error);
        throw error;
      }
    },
    async delete(id) {
      try {
        await db.exec("DELETE FROM tasks WHERE id = ?", [id]);
        return { message: "Tarefa deletada com sucesso." };
      } catch (error) {
        console.error(`Erro ao deletar tarefa com id ${id}:`, error);
        throw error;
      }
    },
  };
}

export const task = initialize;
