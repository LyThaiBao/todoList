// fetch("http://localhost:3000/listTasks")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data[0].name);
//   });

const taskApi = "https://todo-list-api-whgl.onrender.com/group2";
var time = new Date();
console.log(time.getMinutes());

function start() {
  getTasks(reRenderList);
  handleValueUserByButton();
}
start();
function getTasks(callback) {
  setInterval(() => {
    fetch(taskApi)
      .then((response) => response.json())
      .then(callback);
  }, 2000);
}
function reRenderList(tasks) {
  var containList = document.querySelector(".list__task");
  var information = tasks
    .map(
      (infor) => `
          <div class ="list__item">
            <div class = "main__task">
              <p><i class="fa-solid fa-comment"  style = "padding-right: 10px;color: blue""></i>${infor.content}</p>
              <small class= "time">${infor.time}</small>
            </div>
            <div class = "remove__task" onclick = "handleDeleteTask(${infor.id})">
            <i class="fa-solid fa-trash"></i>
            </div>
          </div> 
      `
    )
    .join(" ");
  containList.innerHTML = information;
}

function createTask(data) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(taskApi, option)
    .then((response) => response.json())
    .then(() => {
      getTasks(reRenderList);
    })
    .catch((Error) => console.log("Khong them được"));
}

function handleValueUserByButton() {
  var btnAdd = document.querySelector(".add__task");
  btnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    // var ten = document.querySelector('input[name="name"]');
    var noiDung = document.querySelector('input[name="content"]');
    var taskForm = {
      time: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
      content: noiDung.value,
    };
    if (noiDung !== "") {
      createTask(taskForm);
    }
    // ten.value = " ";
    noiDung.value = " ";
  });
}

function handleDeleteTask(id) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(taskApi + "/" + id, option)
    .then((response) => response.json())
    .then(() => {
      getTasks(reRenderList);
    });
}
