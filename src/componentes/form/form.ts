function initFormComp() {
  class FormComp extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }

    addListener() {
      this.shadow
        .querySelector(".form")
        ?.addEventListener("submit", (e: any) => {
          e.preventDefault();

          const eventoCustom = new CustomEvent("addTask", {
            detail: { task: e.target.tarea.value },
          });

          this.dispatchEvent(eventoCustom);

          e.target.reset();
        });
    }
    render() {
      this.shadow.innerHTML = `
        
        
        <div class="container-form">
        <h1 class="form-title">Mis pendientes</h1>

        <form autocomplete="off" class="form">
          <div class="textfield-form">
            <label class="form-label" for="input">Nuevo pendiente</label>
            <input autocomplete="off" class="form-input" type="text" id="input" name="tarea" />
          </div>
          <button class="button-form">Agregar</button>
        </form>
      </div>
        
        `;

      const style = document.createElement("style");
      style.innerText = `
      * {
      box-sizing: border-box;
    }
      
      .container-form {
        max-width: 530px;
        margin: 0 auto;
      }
      .form-title {
        font-size: 52px;
        font-weight: 700;
        margin: 40px 0px 25px 0px;
      }
      .form-input:focus{
        border: solid 2px;
        transition: .5s linear;
        box-shadow: 5px 5px;
        height:60px;
      }
      .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 530px;
      }
      @media (min-width: 850px) {
        .textfield-form{

          width:100%;
        }
        .container-form{
          max-width: 960px;
          
        }
        .form {
          max-width: 960px;
          flex-direction: row;
          
          align-items: flex-end;
          gap:30px;
          justify-content: space-between;
        }
        .button-form{
          max-width:312px;
          font-family: 'Roboto', sans-serif;
        }
        .button-form:hover{
          background-color : black;
          color:white;
          border: solid 3px;
          transition: 1.5s linear;
        }
        
      }
      .form-label {
        display: block;
        font-size: 18px;
        font-weight: 400;
      }
      
      .form-input {
        height: 55px;
        border: 2px solid #000000;
        border-radius: 4px;
        width: 100%;
        font-size: 20px;
        padding: 15px;
      }
      .button-form {
        background-color: #9cbbe9;
        width: 100%;
        height: 55px;
        border-radius: 4px;
        border: none;
        font-size: 22px;
        font-weight: 700;
      }
      

      
      `;
      this.shadow.appendChild(style);
      this.addListener();
    }
  }
  customElements.define("form-el", FormComp);
}

export { initFormComp };
