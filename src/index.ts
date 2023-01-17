import { initFormComp } from "./componentes/form/form";
import { initTaskComp } from "./componentes/task/task";
import "./componentes/form/form";
import { initHomePage } from "./pages/home/home";
import { state } from "./state";

(function () {
  initTaskComp();
  initFormComp();

  const stateSaved = localStorage.getItem("state");
  if (stateSaved != null) {
    state.setState(JSON.parse(stateSaved));
  }

  const root: any = document.querySelector(".root");

  initHomePage(root);
})();
