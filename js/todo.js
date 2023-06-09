const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");

const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let toDos = [];

//저장
function saveToDo(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

//삭제
function deleteTodo(event){
   
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id != parseInt(li.id));
    saveToDo(); 
}

//화면에 리스트 보이기
function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = " ❌";
    button.addEventListener("click", deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

//엔터 키 눌렀을 때
function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = ""; //입력 후 공백 만들기

    const newToDoObj = {
        text : newToDo, 
        id : Date.now()
    };
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDo(newToDo);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY); 

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}