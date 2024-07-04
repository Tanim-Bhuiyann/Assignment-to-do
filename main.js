const inputElement = document.getElementById("input_title");
const inputBtn = document.getElementById("input_btn");
const todoElement = document.getElementById("todo");
const allElements = [
  document.getElementById("todo"),
  document.getElementById("In Progress"),
  document.getElementById("complete"),
];


/*_________________________________URL_________________________________________________*/

let baseUrl = "https://todo-crudl.deno.dev";
let userId = "tanim";
let url = `${baseUrl}/${userId}/todos`;


/*___________________________Add To-do_________________________________________________*/

inputBtn.addEventListener("click", async () => {
  let title = inputElement.value;
  console.log(title);
  if (title) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      console.log(data);
      loadTodo();
    } catch (error) {
      console.error("Got Error", error);
    }
  } else {
    alert("Add To-Do");
  }
});


/*___________________________Print in To-do_________________________________________________*/

function renderTodo(todos) {
  let todoElement = document.getElementById("todo");
  todoElement.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    let data = todos[i];
    if (data.status == "todo") {
      todoElement.innerHTML += `<div class="flex items-center justify-between">
<div>
  <input class="statusTodo" type="checkbox" id="${data.id} " key="${data.status}"/>
  <label class="pl-2 font-bold">${data.title}</label>
</div>
                  <button id="deleteBtn" data-id="${data.id}"
                    type="button"
                     class="deleteBtn bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                    <span class="sr-only">Close menu</span>
                    <svg
                      class="h-6 w-5 pt-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
</div>`;
    }
  }
}

/*___________________________Print in In Progress To-do_________________________________________________*/


function renderInProgress(todos) {
  let todoElement = document.getElementById("In Progress");
  todoElement.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    let data = todos[i];
    if (data.status == "in-progress") {
      todoElement.innerHTML += `<div class="flex items-center justify-between">
<div>
<input class="statusTodo" type="checkbox" id="${data.id} " key="${data.status}"/>
<label class="pl-2 font-bold">${data.title}</label>
</div>
                <button id="deleteBtn" data-id="${data.id}"
                  type="button"
                  class="deleteBtn bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                  <span class="sr-only">Close menu</span>
                  <svg
                    class="h-6 w-5 pt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
</div>`;
    }
  }
}




/*___________________________Print in Complete To-do_________________________________________________*/
function renderComplete(todos) {
  let todoElement = document.getElementById("complete");
  todoElement.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    let data = todos[i];
    if (data.status == "complete") {
      todoElement.innerHTML += `<div class="flex items-center justify-between">
<div>

<label class="pl-2 font-bold">${data.title}</label>
</div>
                <button id="deleteBtn" data-id="${data.id}"
                  type="button"
                  class="deleteBtn bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                  <span class="sr-only">Close menu</span>
                  <svg
                    class="h-6 w-5 pt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
</div>`;
    }
  }
}


/*___________________________Load To-do_________________________________________________*/

async function loadTodo() {
  const response = await fetch(url);
  const todos = await response.json();
  renderTodo(todos);
  renderInProgress(todos);
  renderComplete(todos);
}


/*___________________________Delete To-do_________________________________________________*/

allElements.forEach((element) => {
  if (element) {
    element.addEventListener("click", async (event) => {
      if (event.target.closest(".deleteBtn")) {
        const button = event.target.closest(".deleteBtn");
        const todoId = button.getAttribute("data-id");

        try {
          const delResponse = await fetch(`${url}/${todoId}`, {
            method: "DELETE",
          });
          const delData = await delResponse.json();
          console.log(delData);
          loadTodo();
        } catch (error) {
          console.error("Got Error", error);
        }
      }
    });
  }
});


/*____________________________________Change Status__________________________________________ */

allElements.forEach((element) => {
  if (element) {
    element.addEventListener("click", async (event) => {
      if (event.target.closest(".statusTodo")) {
        const statusBtn = event.target.closest(".statusTodo");
        const statusId = statusBtn.getAttribute("id");
        const statusKey = statusBtn.getAttribute("key");
        console.log(statusId);
        let newStatus;
        if (statusKey === "todo") {
          newStatus = "in-progress";
        } else if (statusKey === "in-progress") {
          newStatus = "complete";
        }
        console.log(newStatus);
        try {
          const updateStatus = await fetch(`${url}/${statusId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          });
          const statusData = await updateStatus.json();
          console.log(statusData);
          loadTodo();
        } catch (error) {
          console.error("Got Error", error);
        }
      }
    });
  }
});

/* _________________load_____________________ */

loadTodo();
