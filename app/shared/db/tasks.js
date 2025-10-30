function initialize(db) {
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
      `;
        }

        const tasksResult = db.exec(tasksQuery, params);

        if (tasksResult.length === 0) return [];

        const tasks = tasksResult[0].values.map((row) => ({
          id: row[0],
          title: row[1],
          progress: row[2],
          updatedAt: row[3],
          total_subtasks: row[4],
          subtasks: [],
        }));

        for (let i = 0; i < tasks.length; i++) {
          const subtasksQuery = `
        SELECT id, description FROM subtasks WHERE task_id = ? LIMIT 3
      `;
          const subtasksResult = db.exec(subtasksQuery, [tasks[i].id]);
          if (subtasksResult.length > 0) {
            tasks[i].subtasks = subtasksResult[0].values.map((row) => ({
              id: row[0],
              description: row[1],
            }));
          }
        }

        return tasks;
      } catch (error) {
        console.error("Erro ao listar tarefas:", error);
        throw error;
      }
    },
    async getById(id) {
      try {
        const taskResult = db.exec("SELECT * FROM tasks WHERE id = ?", [id]);
        if (taskResult.length === 0) return null;
        const taskRow = taskResult[0].values[0];
        const task = {
          id: taskRow[0],
          title: taskRow[1],
          progress: taskRow[2],
          createdAt: taskRow[3],
          updatedAt: taskRow[4],
          subtasks: [],
        };

        const subtasksQuery = `
      SELECT 
        s.id, s.description, s.note, s.priority, s.status, s.created_at, s.updated_at,
        g.id as group_id, g.name as group_name,
        r.id as responsible_id, r.name as responsible_name
      FROM subtasks s
      LEFT JOIN groups g ON s.group_id = g.id
      LEFT JOIN responsibles r ON s.responsible_id = r.id
      WHERE s.task_id = ?
    `;
        const subtasksResult = db.exec(subtasksQuery, [id]);

        if (subtasksResult.length > 0) {
          task.subtasks = subtasksResult[0].values.map((row) => ({
            id: row[0],
            description: row[1],
            note: row[2],
            priority: row[3],
            status: row[4],
            createdAt: row[5],
            updatedAt: row[6],
            group: row[7] ? { id: row[7], name: row[8] } : undefined,
            responsible: row[9] ? { id: row[9], name: row[10] } : undefined,
          }));
        }

        return task;
      } catch (error) {
        console.error(`Erro ao buscar tarefa com id ${id}:`, error);
        throw error;
      }
    },
    async create({ title, progress = 0 }) {
      try {
        db.exec("INSERT INTO tasks (title, progress) VALUES (?, ?)", [
          title,
          progress,
        ]);
        const row = db.exec("SELECT last_insert_rowid() as id");
        const id = row[0].values[0][0];
        return getById(id);
      } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        throw error;
      }
    },
    async update({ id, title, progress }) {
      try {
        db.exec("UPDATE tasks SET title = ?, progress = ? WHERE id = ?", [
          title,
          progress,
          id,
        ]);
        return getById(id);
      } catch (error) {
        console.error(`Erro ao atualizar tarefa com id ${id}:`, error);
        throw error;
      }
    },
    async delete(id) {
      try {
        db.exec("DELETE FROM tasks WHERE id = ?", [id]);
        return { message: "Tarefa deletada com sucesso." };
      } catch (error) {
        console.error(`Erro ao deletar tarefa com id ${id}:`, error);
        throw error;
      }
    },
  };
}

export const task = initialize;
