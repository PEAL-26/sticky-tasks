# Sticky Tasks

Aplicação de notas/tarefas “autoadesivas” com interface web minimalista, app desktop via Tauri e app mobile com Expo/React Native. O projeto organiza as listas e tarefas em uma UI enxuta, com camada de dados preparada para SQLite (WASM no Web) e configuração pronta para empacotar no Desktop.

![Screenshot](docs/sticky_notes.png)

## Visão Geral

- **Web (HTML/CSS/JS puro)**: interface renderizada em `app/web/index.html`, estilos em `app/web/assets/css/style.css` e lógica em `app/web/assets/js/`.
- **Desktop (Tauri + Rust)**: empacota a UI web como app nativo. Código em `app/desktop` e configuração em `app/desktop/tauri.conf.json`.
- **Mobile (Expo/React Native)**: projeto base em `app/mobile` para evoluir a experiência no celular.
- **Camada compartilhada de dados**: módulos de DB esboçados em `app/web/assets/js/db` e `app/shared/db` para evoluir um modelo comum.

## Tecnologias

- **HTML, CSS, JavaScript** (Web)
- **Tauri 2 + Rust** (Desktop)
- **Expo + React Native** (Mobile)
- **SQLite (WASM no browser)** através de `sqlite3.js` (pré-carregado em `app/web/assets/js/jswasm/`).

## Estrutura do Projeto

```
sticky-tasks/
  app/
    web/            # UI Web (HTML/CSS/JS) + sqlite WASM
    desktop/        # App Tauri (Rust)
    mobile/         # App Expo/React Native
    shared/         # Módulos de dados compartilhados (esboços)
    server.js       # Servidor estático para desenvolvimento Web
```

Referências principais:
- `app/web/index.html`: estrutura da UI e carregamento dos scripts (`lucide`, `sqlite3.js`, DB e `script.js`).
- `app/web/assets/js/script.js`: renderização de listas, detalhes e interações da UI.
- `app/web/assets/js/db/database.js`: inicialização do SQLite (WASM) no navegador e stubs de repositórios (`lists`, `tasks`, etc.).
- `app/desktop/src/lib.rs` e `app/desktop/src/main.rs`: bootstrap do Tauri.
- `app/desktop/tauri.conf.json`: aponta o frontend para `../web` no build e `devUrl` para `http://localhost:8080` no dev.
- `app/server.js`: servidor HTTP estático usando `serve-handler`.
- `app/mobile/App.tsx`: tela inicial padrão do Expo.

## Funcionalidades (estado atual)

- Lista e exibe coleções de tarefas mockadas em memória.
- Tela de detalhes da lista com campos de edição (a serem conectados ao repositório de dados).
- Ícones via `lucide`.
- Camada de dados esboçada para evoluir para CRUD real com SQLite WASM no Web.

## Pré-requisitos

- Node.js LTS (≥ 18)
- npm
- Rust (para Desktop/Tauri): `rustup`, toolchain estável
- Tauri CLI (dev): `npm i -D @tauri-apps/cli`
- Expo CLI (opcional p/ mobile): `npm i -g expo` ou usar npx

## Como rodar em Desenvolvimento

### 1) Web

Dentro de `app/` existe um script para servir `web/` estaticamente:

```bash
cd app
npm run dev
```

Isso inicia `app/server.js` em `127.0.0.1:8080` servindo a pasta `web/`.

Observação: o log atual imprime `http://127.0.0.1:8888`, mas o servidor realmente escuta em `8080` (conferir `server.js`).

Abra:

```text
http://127.0.0.1:8080
```

### 2) Desktop (Tauri)

O Tauri usa a UI de `app/web` durante o dev e aponta para `http://localhost:8080` (conforme `tauri.conf.json`). Em uma sessão, suba o servidor Web conforme acima, e em outra rode:

```bash
cd app
npx tauri dev
```

Para build (gerar binários):

```bash
cd app
npx tauri build
```

### 3) Mobile (Expo)

Na pasta mobile:

```bash
cd app/mobile
npm install
npm run start
# ou
npm run android
# ou
npm run ios
# ou
npm run web
```

O app mobile está no esqueleto padrão do Expo e pode ser integrado depois à API/DB que você definir.

## Scripts npm úteis (pasta `app/`)

- `npm run dev`: sobe o servidor estático para `web/` em `http://127.0.0.1:8080`.
- `npm run dev:tauri`: executa `tauri dev` (requer servidor web ativo em `8080`).

## Banco de Dados (Web)

- O Web utiliza `sqlite3.js` (WASM) carregado via `<script>` em `index.html`.
- Inicialização está em `app/web/assets/js/db/database.js`:
  - Cria/abre `sticky_tasks.sqlite` no contexto do browser.
  - Contém esboços de criação de tabelas e repositórios (`lists`, `tasks`, `groups`, etc.).
- O estado atual usa dados mock para renderização; conecte os CRUDs à UI conforme a evolução.

## Roadmap sugerido

- Conectar os repositórios (`lists`, `tasks`, etc.) à UI para CRUD real.
- Validar e corrigir DDLs (types, autoincrement, timestamps) e aplicar migrações.
- Sincronização entre Web/Desktop (compartilhar DB/local storage conforme estratégia).
- Definir API/back-end (se necessário) e integrar Mobile.
- Melhorias de UX: drag & drop, filtros, pesquisa funcional, teclado.

## Build & Distribuição

- Desktop: `npx tauri build` gera instaladores/artefatos para o seu SO (ver ícones em `app/desktop/icons/`).
- Web: conteúdo estático em `app/web/`. Pode ser servido via qualquer CDN/host estático.
- Mobile: usar `eas build` (Expo) ou pipelines nativos quando a app for integrada.

## Licença

ISC — ver `package.json` em `app/`.

## Autor

PEAL-26

