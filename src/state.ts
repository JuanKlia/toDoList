const state = {
  data: {
    tasks: [],
  },
  listeners: [],
  lastChange: "",

  lastTaskChange(id) {
    const lastTaskChange = this.getState().tasks.find((t) => {
      return t.id == id;
    });
    this.lastChange = lastTaskChange.id;
  },
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    this.syncLocalStorage();
    console.log("El estado ha cambiado: ", this.data.tasks);
    for (const callback of this.listeners) {
      callback();
    }
  },
  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  addNewTask(task: string) {
    const newTask = { id: Math.random(), task: task, completed: false };
    const state = this.getState();
    state.tasks.push(newTask);
    this.lastTaskChange(newTask.id);
    this.setState({ ...state });
  },
  getNotDeletedTaks() {
    const taksFiltreds = this.getState().tasks.filter((t) => {
      if (!t.deleted) {
        return true;
      }
    });
    return taksFiltreds;
  },

  changeTask(id, completed) {
    this.lastTaskChange(JSON.parse(id));

    const state = this.getState();
    const encontrado = state.tasks.find((t) => t.id == id);
    encontrado.completed = JSON.parse(completed);
    this.setState(state);
  },
  deleteTask(id) {
    this.lastTaskChange(JSON.parse(id));
    const state = this.getState();
    const encontrado = state.tasks.find((t) => {
      return t.id == JSON.parse(id);
    });

    delete encontrado.completed;
    encontrado.deleted = true;
    setTimeout(() => {
      this.setState(state);
    }, 2000);
  },
  syncLocalStorage() {
    const lastState = this.getState();
    localStorage.setItem("state", JSON.stringify(lastState));
  },
};

export { state };
