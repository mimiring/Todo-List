const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".greetings");

const USER_LS = "이름"; //key명 설정
const SHOWING_ON = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text); //USER_LS의 value를 세팅
}

function handleSubmit(event) {
    event.preventDafault;
    //submit은 실행되면 value가 server로 옮겨지고 종료되기 때문에 디폴트해제
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
    //input에 입력한 값을 paintGreeting 및 savaName 실행(text라는 argument로 받아서)
}

function askForName() {
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit", handleSubmit);
    //submit하면 동작하는 함수 세팅
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    //greeting에 SHOWING_ON 이라는 class 추가(해당 함수 시행여부 확인)
    greeting.innerText = `Hello ${text}!`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    //localStorage에서 USER_LS의 정보를 가져옴
    if(currentUser === null) { // localStorage에 유저 이름이 없으면 이름을 물어봄.
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}
init();