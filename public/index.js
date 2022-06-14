const themeIcon = document.querySelector(".theme-icon");
const body = document.querySelector("body");
const bgTheme = document.querySelector(".bg-theme");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const results = document.querySelector(".todo-container");
const todoNo = document.querySelector(".todo-no");
let todo_no = 0;
let isChecked = false;
let isDark = false;

todoNo.textContent = todo_no;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "" || input.value === null) {
    console.log("Please Input value");
  } else {
    createTodoItem(input);
    input.value = "";
    todo_no++;
    todoNo.textContent = todo_no;
  }
});

const item = function (id, value) {
  this.id = id;
  this.task = value;
};

results.addEventListener("dragover", (e) => {
  e.preventDefault();
  const dragCurrent = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(results, e.clientY);
  if (afterElement == null) {
    results.appendChild(dragCurrent);
  } else {
    results.insertBefore(dragCurrent, afterElement);
  }
});

function createTodoItem(input) {
  const divTask = document.createElement("div");
  results.prepend(divTask);
  divTask.classList =
    "flex justify-between items-center px-8 cursor-pointer py-3 border-b-[1px]  dark:border-gray-500 todoItem draggable all active";
  divTask.setAttribute("draggable", "true");
  const divTaskLi = divTask.appendChild(document.createElement("li"));
  divTaskLi.classList = "flex justify-start items-center ";
  divTaskLi.innerHTML = `  <span  class="rounded-full p-2 w-6 h-6 border-[1px] dark:border-gray-400 mr-4 dark:border-opacity-10">
    <img class="bg-transparent w-full h-2 hidden" src="../todo-app-main/images/icon-check.svg" alt=""/></span>${input.value}`;
  const divTaskImg = divTask.appendChild(document.createElement("img"));
  divTaskImg.classList = ("bg-transparent", "hidden");
  divTaskImg.setAttribute("src", "../todo-app-main/images/icon-cross.svg");

  const liSpan = divTaskLi.querySelector("span");
  const liImg = divTaskLi.querySelector("img");

  divTaskImg.addEventListener("click", () => {
    divTask.remove();
    todo_no--;
    todoNo.textContent = todo_no;
  });

  divTask.addEventListener("mouseover", () => {
    divTaskImg.classList.remove("hidden");
  });
  divTask.addEventListener("mouseleave", () => {
    divTaskImg.classList.add("hidden");
  });

  divTask.addEventListener("click", () => {
    isChecked = !isChecked;

    if (isChecked) {
      divTaskLi.classList.add("completedLi");
      divTask.classList.replace("active", "completed");
    } else {
      divTaskLi.classList.remove("completedLi");
      divTask.classList.replace("completed", "active");
    }
    if (divTaskLi.classList.contains("completedLi")) {
      divTaskLi.classList.add("line-through", "text-gray-400");
      liSpan.classList.add(
        "bg-gradient-to-br",
        "from-blue-300",
        "to-violet-600",
        "border-0"
      );
      liImg.classList.remove("hidden");
    } else {
      divTaskLi.classList.remove("line-through", "text-gray-400");
      liSpan.classList.remove(
        "bg-gradient-to-br",
        "from-blue-300",
        "to-violet-600",
        "border-0"
      );
      liImg.classList.add("hidden");
    }
    // getCompletedItems();
  });

  divTask.addEventListener("dragend", () => {
    divTask.classList.remove("opacity-50", "dragging");
  });

  divTask.addEventListener("dragstart", () => {
    divTask.classList.add("opacity-50", "dragging");
  });
}

const allItems = document.querySelectorAll(".all");
function getCompletedItems() {
  const completedItems = document.querySelectorAll(".completed");
  const notCompletedItems = document.querySelectorAll(".all:not(.completed)");
  completedItems.forEach((item) => {
    item.classList.remove("hidden");
  });
  notCompletedItems.forEach((item) => {
    item.classList.add("hidden");
  });
  todoNo.textContent = completedItems.length;
}

function clearCompletedItems() {
  const completedItems = document.querySelectorAll(".completed");
  completedItems.forEach((item) => {
    item.remove();
  });
  const allItems = document.querySelectorAll(".all");
  todoNo.textContent = allItems.length;
}

function getActiveItems() {
  const activeItems = document.querySelectorAll(".active");
  const notActiveItems = document.querySelectorAll(".all:not(.active)");
  activeItems.forEach((item) => {
    item.classList.remove("hidden");
  });
  notActiveItems.forEach((item) => {
    item.classList.add("hidden");
  });
  todoNo.textContent = activeItems.length;
}

function getAllItems() {
  const allItems = document.querySelectorAll(".all");
  allItems.forEach((item) => {
    item.classList.remove("hidden");
  });
  todoNo.textContent = allItems.length;
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { element: child, offset: offset };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
}

themeIcon.addEventListener("click", () => {
  isDark = !isDark;
  if (isDark) {
    themeIcon.setAttribute("src", "../todo-app-main/images/icon-moon.svg");
    body.classList.replace("light", "dark");
  } else {
    themeIcon.setAttribute("src", "../todo-app-main/images/icon-sun.svg");
    body.classList.replace("dark", "light");
  }
});
