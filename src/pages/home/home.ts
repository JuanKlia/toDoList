import { state } from "../../state";

function addListeners() {
  document.querySelector(".form")?.addEventListener("addTask", (e: any) => {
    state.addNewTask(e.detail.task);
  });
}

function initHomePage(container: Element) {
  const div = document.createElement("div");

  div.innerHTML = ` 
  
    <form-el class="form"></form-el>
    <div class="tasks-container"> </div>
    
`;

  function renderTasks() {
    //Lo que renderiza es lo que cambia, no toda la pagina de nuevo
    while (div.querySelector(".tasks-container")?.firstChild) {
      div.querySelector(".tasks-container")?.firstChild?.remove();
    }
    const tasks = state.getNotDeletedTaks();
    const idLastChang = state.lastChange;

    if (tasks.length == 0) {
      const h2 = document.createElement("h2");

      h2.innerHTML = `No hay pendientes <span class="sp1">.</span> <span class="sp2">.</span> <span class="sp3">.</span>`;

      h2.classList.add("noPendientesAnimation");
      div.querySelector(".tasks-container")?.appendChild(h2);
    } else {
      const noCompletedTasks = tasks.filter((t) => {
        if (t.completed == false) {
          return true;
        }
      });

      for (const t of noCompletedTasks) {
        const task = document.createElement("task-el");

        task.setAttribute("id", t.id);
        task.setAttribute("task", t.task);
        task.setAttribute("completed", t.completed);
        if (t.id == idLastChang) {
          task.classList.add("lastTaskAdd");
        }
        div.querySelector(".tasks-container")?.appendChild(task);
        task.addEventListener("changeCheck", (e: any) => {
          state.changeTask(e.detail.id, e.detail.completed);
        });
        div.querySelector(".task-container")?.appendChild(task);
        task.addEventListener("deleteTask", (e: any) => {
          state.deleteTask(e.detail.id);
        });
      }
      const CompletedTasks = tasks.filter((t) => {
        if (t.completed == true) {
          return true;
        }
      });
      for (const t of CompletedTasks) {
        const task = document.createElement("task-el");

        task.setAttribute("id", t.id);
        task.setAttribute("task", t.task);
        task.setAttribute("completed", t.completed);
        if (t.id == idLastChang) {
          task.classList.add("lastTaskAdd");
        }
        div.querySelector(".tasks-container")?.appendChild(task);

        task.addEventListener("changeCheck", (e: any) => {
          state.changeTask(e.detail.id, e.detail.completed);
        });
        task.addEventListener("deleteTask", (e: any) => {
          state.deleteTask(e.detail.id);
        });
      }
    }
  }

  renderTasks();
  container.appendChild(div);
  addListeners();

  state.suscribe(() => {
    renderTasks();
  });
}

export { initHomePage };
