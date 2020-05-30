const toDoForm = document.querySelector(".toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".todo_list");

const TODOS_LS = "할일 리스트";

let toDos = [];

function delToDo(event) {
    const btn = event.target; //event를 전달한 객체 참조
    const li = btn.parentNode; //btn의 부모
    toDoList.removeChild(li); //delBtn을 누른(evnet.target) 상위 li(btn의 부모)를 remove
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.Number !== parseInt(li.id);
    });
    //toDOs라는 array에 저장되어 있는 값을 toDo라는 argument로 받아서 하나하나 실행
    //toDos에는 삭제되기 전 Number가 있으므로 삭제가 된 li 의 id와 다르다면 남아있는 값임
    toDos = cleanToDos; //filter하여 true인 값을 toDos에 새로 입력
    saveToDos(); //새로운 toDos를 저장
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //입력받은 JS object를 문자열로 변환
}

function paintToDo(text) { //toDoInput의 value를 argument로 받아서 실행
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "Remove Todo";
    delBtn.addEventListener("click", delToDo);
    //button click하면 동작하는 함수 세팅

    const span = document.createElement("span");
    const newID = toDos.length + 1;
    //미리 Number(1,2,3...) 설정하고 값 받음
    span.innerHTML = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newID;
    toDoList.appendChild(li);
    //toDoList 하위에 li와 button 생성: 위에서 각각 createElement("li"/"button") 해줬음
    const toDoObj = {
        text: text, //★★
        "Number": newID
    };
    toDos.push(toDoObj);
    //toDoObj라는 object에 저장된 정보를 toDos라는 array에 push
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        //입력받은 문자열을 JS object로 변환
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();
