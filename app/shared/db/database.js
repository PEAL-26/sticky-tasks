


window.addEventListener("load", () => {
    createDatabase();
});

async function createDatabase() {
    const sql = `
    create table lists(
        id int autoincremet
        title varchar(255)
        created_at datetime default now
        updated_at datetime
    );
    `
    try {
        // Inicializa o SQLite WASM
        const sqlite3 = await window.sqlite3InitModule();

        // Cria um banco persistente na memória do navegador
        const db = new sqlite3.oo1.DB("sticky_tasks.sqlite", "c"); // "c" significa "criar se não existir"

        // console.log("Banco de dados criado!");

        // // Criar tabelas
        // db.exec(`
        //         CREATE TABLE IF NOT EXISTS usuarios (
        //             id INTEGER PRIMARY KEY AUTOINCREMENT,
        //             nome TEXT NOT NULL,
        //             email TEXT UNIQUE NOT NULL
        //         );
                
        //         CREATE TABLE IF NOT EXISTS tarefas (
        //             id INTEGER PRIMARY KEY AUTOINCREMENT,
        //             usuario_id INTEGER NOT NULL,
        //             descricao TEXT NOT NULL,
        //             concluido BOOLEAN DEFAULT 0,
        //             FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        //         );
        //     `);


            
        //console.log(await db.exec(`SELECT * FROM tarefas`));

        db.close();
        console.log("Banco de dados fechado.");
    } catch (error) {
        console.error("Erro:", error);
    }
}

const groups = {
    all: async () => { },
    getById: async () => { },
    create: async () => { },
    update: async () => { },
    delete: async () => { },
}

const lists = {
    all: async () => {
        return Array.from({ length: 10 }).map((_, index) => (
            {
                id: index,
                title: `Titulo ${index}`,
                tasks: [
                    { description: "description " + index },
                    { description: "description " + (index + 1) },
                    { description: "description " + (index + 2) },
                ],
            }
        ))
    },
    getById: async () => {

        return {

            tasks: [{
                
            }]
        }
    },
    create: async () => { },
    update: async () => { },
    delete: async () => { },
}

const progresss = {
    all: async () => { },
    getById: async () => { },
    create: async () => { },
    update: async () => { },
    delete: async () => { },
}

const tasks = {
    all: async () => { },
    getById: async () => { },
    create: async () => { },
    update: async () => { },
    delete: async () => { },
}

const responsibles = {
    all: async () => { },
    getById: async () => { },
    create: async () => { },
    update: async () => { },
    delete: async () => { },
}


const db = {
    groups,
    lists,
    progresss,
    tasks,
    responsibles
}
