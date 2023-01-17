function initTaskComp() {
  class CardTask extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    id;
    task;
    completed;

    constructor() {
      super();
    }
    connectedCallback() {
      this.id = this.getAttribute("id");
      this.task = this.getAttribute("task");
      this.completed = this.getAttribute("completed");
      this.render();
      this.addListeners();
    }

    addListeners() {
      const deleteButton = this.shadow.querySelector(".card-delete");
      deleteButton?.addEventListener("click", (e) => {
        this.shadow
          .querySelector(".card-container")
          ?.classList.add("deletedTask");
        const eventDelete = new CustomEvent("deleteTask", {
          detail: { id: this.id },
        });
        this.dispatchEvent(eventDelete);
      });

      const input = this.shadow.querySelector(".input");
      input?.addEventListener("click", (e: any) => {
        if (e.target.checked) {
          this.completed = "true";
          this.shadow
            .querySelector(".card-container")
            ?.classList.add("tachado");
        } else {
          this.completed = "false";
          this.shadow
            .querySelector(".card-container")
            ?.classList.remove("tachado");
        }

        const eventoCustom = new CustomEvent("changeCheck", {
          detail: { id: this.id, completed: this.completed },
        });
        this.dispatchEvent(eventoCustom);
      });
    }

    render() {
      this.shadow.innerHTML = `
      
    
      <div tabindex="0" class="card-container ${
        this.completed == "true" ? "tachado" : ""
      }">
      <div class="card-text">
        <h4 >${this.task}</h4>
      </div>
      <div class="card-options">
       <input  class="input" ${
         this.completed == "true" ? "checked" : ""
       } type="checkbox" /> 
        
        <div class="card-delete">
        
        </div>
      </div>
    </div>
    
    
    `;

      const imageURL = require("url:../../img/trash.png");
      const img = document.createElement("img");
      img.setAttribute("src", imageURL);
      img.classList.add("img");
      this.shadow.querySelector(".card-delete")?.appendChild(img);

      const style = document.createElement("style");
      style.innerText = `
      * {
      box-sizing: border-box;
      }

    
    .card-container {
        height: 112px;
        background-color: #fff599;
        max-width: 311px;
        display: flex;
        justify-content: space-between;
        padding: 22px 10px;
        gap: 10px;
        border-radius: 4%;
      }
     
   .input{
     appearance: none;
     border-radius:50%;
     background-color: white;
     border: 2px solid ;
     cursor: pointer;
     }
     .input:checked {
      background-color: black;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    } 
    
   
   
      .card-container:focus   {
        border: solid 3px;
        box-shadow: 5px 5px 20px;
        transition: 0.5s linear;
      }
      .card-text {
        width: 100%;
        word-wrap: break-word;
      }
     
      .tachado{
        text-decoration: line-through 3px;
        background-color: coral;
      }

      .card-text h4 {
        margin: 0;
      }
      
      .card-options {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
      .card-options input {
        height: 21px;
        width: 21px;
        margin: 0;
      }
      
      .card-delete {
        height: 28px;
        width: 28px;
        opacity: 0;
      }
      .card-delete img {
        height: 100%;
        width: 100%;
      }
      .deletedTask {
  animation: clearTask 3s forwards;
}
@keyframes clearTask {
  from{
    opacity:1;
  }
  to{
    opacity:0;
  }
}
      .card-container:focus .card-delete  {
        animation: opacidad 3s forwards;
      }
      @keyframes opacidad {
        0% {
          opacity: 0;
        }
      
        100% {
          opacity: 1;
        }
      }
    
    `;
      this.shadow.appendChild(style);
    }
  }
  customElements.define("task-el", CardTask);
}
export { initTaskComp };
