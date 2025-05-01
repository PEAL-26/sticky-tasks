const contentListItems = document.getElementById("content-list-items");
const contentListDetails = document.getElementById(
  "content-list-details"
);

window.addEventListener("load", () => {
  listItems()
});

document.addEventListener("load", () => {
  alert("")
})

document.querySelectorAll(".list-card-menu-btn").forEach((menuButton) => {
  menuButton.addEventListener("click", (e) => {
    e.stopPropagation()
    const listId = menuButton.getAttribute("data-id")
    console.log(listId)
  })
})

async function listItems() {
  const lists = await db.lists.all();
  const html = lists?.map((list) => renderListItemComponent(list))?.join("");
  contentListItems.innerHTML = html || renderEmptyList();
  listCreateIcons();
}

function handleToggleMenuList(e) {
  console.log(e);
}

function renderEmptyList() {
  return `
    <div class="flex justify-center items-center h-full">
        <span style="font-size:14pt">Lista de tarefas vazia!</span>
    </div>
    `;
}

function handleAddListTask() {
  alert("add");
}

function listDetailsCreateIcons() {
  const [listDetails] = document.getElementsByClassName("list-details");
  if (listDetails) {
    const icons = listDetails.querySelectorAll("i");
    icons.forEach((icon) => {
      const attr = icon.getAttribute("data-lucide");
      const iconElement = getIconByName(attr);
      //console.log(iconElement, attr)

      //const i = document.createElement('i')

      //i.innerHTML = iconElement

      //icon.appendChild(i)
    });
  }
}

function listCreateIcons() {
  const [listDetails] = document.getElementsByClassName("list-details");
  if (listDetails) {
    const icons = listDetails.querySelectorAll("i");
    icons.forEach((icon) => {
      const attr = icon.getAttribute("data-lucide");
      const iconElement = getIconByName(attr);
      //console.log(iconElement, attr)

      //const i = document.createElement('i')

      //i.innerHTML = iconElement

      //icon.appendChild(i)
    });
  }
}

async function handleListDetails(listId) {
  contentListItems.setAttribute("data-show", false);
  contentListDetails.setAttribute("data-show", true);
  const data = await db.lists.getById(listId);
  contentListDetails.innerHTML = renderListDetails(data);
  listDetailsCreateIcons();
}

function handleGoBackList() {
  contentListItems.setAttribute("data-show", true);
  contentListDetails.setAttribute("data-show", false);
}

function renderListItemComponent(list) {
  return `
          <div class="list-card mb-8" onclick="handleListDetails(${list.id})">
              <div class="bg-gray flex items-center justify-between" style="height: 28px">
                  <div class="flex items-center h-full">
                      <span class="bg-gray color-primary px-8 font-bold">${
                        list.title
                      }</span>
                  </div>
                  <div class="flex h-full">
                      <button data-id="${
                        list.id
                      }" class="button-secondary list-card-menu-btn">
                      <i data-lucide="ellipsis"></i>
                      </button>
                  </div>
              </div> 
            
              <div class="flex flex-col gap-2 mt-4 py-4 px-8 relative">
                  ${list.tasks
                    .map((task) => `<span>${task.description}</span>`)
                    .join("")}
              </div>
          </div>`.trim();
}

function renderListDetails(data) {
  return `
        <div class="relative w-full h-full list-details">
            <div class="absolute left-0 top-0 right-0 bg-gray flex flex-row items-center justify-between" style="height: 40px;">
                <div class="flex items-center h-full py-8">
                    <button class="button-secondary h-full" onclick="handleGoBackList()">
                    <i data-lucide="arrow-left"></i>
                    </button>
                    <input class="w-full bg-transparente border-none input color-primary font-bold text-title" value="${
                      data?.title || ""
                    }" placeholder="Sem título" />
                </div>
                <div class="flex h-full">
                    <button class="button-secondary">
                    <i data-lucide="loader"></i>  
                    </button>
                    <button class="button-secondary">
                    <i data-lucide="ellipsis"></i>
                    </button>
                </div>
            </div>
        
            <div class="h-full max-h-full flex flex-col overflow-y-auto" style="padding-top:40px">
                <div class="relative w-full h-40 flex items-center justify-center my-12">
                    <input class="bg-primary border-none input color-gray placeholder-gray text-center" placeholder="Grupo" />
                    <div class="absolute inset-0 flex justify-center items-center -z-1">
                        <div class="w-full h-1 bg-secondary"></div>
                    </div>
                    <div class="absolute left-0 flex justify-center items-center">
                        <button>||</button>
                    </div>
                    <div class="absolute right-0 flex justify-center items-center">
                        <button><i data-lucide="plus"></i></button>
                        <button><i data-lucide="chevron-down"></i></button>
                    </div>
                </div>
                ${data?.tasks?.map((task) => renderTaskItem(task)).join("")}
                <div>
                <button class="button">
                    <i data-lucide="plus"></i>
                </button>
                </div>
            </div>
        
        
            <div class="absolute bottom-0 left-0 right-0 p-8 border-t border-t-secondary bg-primary">
                    Concluído (%): 10%
            </div>
        </div>
          `.trim();
}

function renderTaskItem(task) {
  return `
        <div class="flex items-start w-full mt-12 gap-8">
            <div class="flex">
                <button class="button">|</button>
                <button class="button">|</button>
            </div>
            <div class="flex flex-col w-full">
                <input placeholder="Tarefa" class="bg-primary border-none input color-gray placeholder-gray py-4" value="${
                  task?.description || ""
                }" />

                <div class="flex">
                    <input placeholder="Responsável" class="bg-primary border-none input color-gray placeholder-gray py-4" value="${
                      task?.responsible || ""
                    }"/>
                    <input placeholder="Prioridade" class="bg-primary border-none input color-gray placeholder-gray py-4" value="${
                      task?.priority || ""
                    }"/>
                </div>
            </div>
            <div class="flex items-center">
                <button class="button">!</button>
                <button class="button">
                <i data-lucide="trash-2"></i>
                </button>
            </div>
        </div>
    `;
}

